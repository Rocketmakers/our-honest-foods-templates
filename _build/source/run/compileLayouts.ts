import { LoggerLevel } from "@rocketmakers/log";
import { Args } from "@rocketmakers/shell-commands/lib/args";
import { FileSystem } from "@rocketmakers/shell-commands/lib/fs";
import {
  createLogger,
  setDefaultLoggerLevel,
} from "@rocketmakers/shell-commands/lib/logger";
import Ajv from "ajv";
import * as fs from "fs";
import * as handlebars from "handlebars";
import * as path from "path";

const logger = createLogger("generate-schemas");

async function run() {
  const args = await Args.match({
    log: Args.single({
      description: "The log level",
      shortName: "l",
      defaultValue: "info",
      validValues: ["trace", "debug", "info", "warn", "error", "fatal"],
    }),
    serviceName: Args.single({
      description: "Name of 3rd party service root json file is named after",
      shortName: "s",
      mandatory: true,
    }),
  });

  if (!args) {
    if (process.argv.includes("--help")) {
      return;
    }

    throw new Error("There was a problem parsing the arguments");
  }

  const { log, serviceName } = args;

  setDefaultLoggerLevel(log as LoggerLevel);

  const fileName = `${serviceName}.json`;
  logger.info("filename", fileName);

  if (FileSystem.exists(fileName) === false) {
    throw new Error(`Unable to find file '${fileName}'`);
  }

  const serviceJson = JSON.parse(FileSystem.readFile(fileName));

  const serviceJsonSchema = JSON.parse(
    FileSystem.readFile(
      "node_modules/@rocketmakers/orbit-template-http-repository/lib/serviceJsonSchema.json"
    )
  );

  logger.info("service json schema", serviceJsonSchema);
  const ajv = new Ajv({ allErrors: true, verbose: true });
  const validServiceJson = ajv.validate(serviceJsonSchema, serviceJson);

  logger.info("valid service json schema", validServiceJson);
  if (!validServiceJson) {
    throw new Error(
      `The file ${fileName} failed to meet the predefined schema with the following errors: ${
        ajv.errors ? ajv.errors.map((x) => x.message).toString() : ""
      }`
    );
  }

  const { partials, layouts } = serviceJson as any;

  logger.info("Registering partials --> ");

  for (const partial in partials) {
    const content = FileSystem.readFile(partials[partial].path);
    handlebars.registerPartial(partial, content);
    logger.info("Registered partial: ", partial);
  }

  logger.info("Compiling layouts --> ");
  logger.info("layouts", layouts);

  const compiledLayoutsDir = path.join(__dirname, "../../../compiledLayouts");
  if (FileSystem.exists(compiledLayoutsDir) === false) {
    FileSystem.makeDirectory(compiledLayoutsDir);
  }

  for (const layout in layouts) {
    layouts[layout].templates.forEach(async (template: string) => {
      const content = FileSystem.readFile(
        `${layouts[layout].path}/${template}.handlebars`
      );

      const data = JSON.parse(
        FileSystem.readFile(`${layouts[layout].path}/payloadSchema.json`)
      ).examples[0];
      const compile = handlebars.compile(content, { strict: true });

      try {
        const res = compile(data);
        fs.writeFile(
          path.join(compiledLayoutsDir, `${layout}.${template}`),
          res,
          (err) => {
            if (err) throw err;
          }
        );

        logger.trace("Compiled template: ", res);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- unknown won't satisfy the throw error param type
      } catch (error: any) {
        throw new Error(error);
      }
    });
    logger.info("Compiled layout: ", layout);
  }

  logger.info("Templates successfully validated for service: ", serviceName);
}

run().catch((err) => {
  logger.fatal(err);
  process.exit(-1);
});
