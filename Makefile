#############################
# VARIABLES
#############################
START 										:= $(shell printf "\033[34;1m")
END 										:= $(shell printf "\033[0m")
SHELL 										:= /bin/bash
SHELL_SCRIPTS 								:= _build/scripts
TSNODE 										:= node_modules/.bin/ts-node
TSNODE_SCRIPTS 								:= _build/source/run
TSC 										:= ./node_modules/.bin/tsc
LOG_LEVEL									?= info
HELP_INDENT									:= 15

#############################
# CUSTOM FUNCTIONS
#############################
define header
  $(info $(START)▶▶▶ $(1)$(END))
endef

#############################
# TARGETS
#############################

.PHONY: help
help: ### Display help for common commands.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?###/ { printf "  \033[36m%-${HELP_INDENT}s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.PHONY: help
help-all: ### Display help for all commands.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-${HELP_INDENT}s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)


.PHONY: clean
clean: ### Safely go to a clean git status.
	$(call header,CLEANING...)
	echo 'Creating a temporary commit... use [git reflog] to get your work back!'
	git add -A && ((HUSKY_SKIP_HOOKS=1 git commit -m 'SAVEPOINT' && git reset HEAD^ --hard) || true)
	git clean -dfx

.PHONY: node-setup
node-setup: ## Set up node and npm at the right versions.
	$(call header,NODE SETUP...)
	$(SHELL) $(SHELL_SCRIPTS)/node-setup.sh true

# Can prepend with REGISTRY=local to swap registry
.PHONY: install
install: node-setup ### Install node_modules (more than just `npm i`...).
	$(call header,RUNNING ROOT INSTALL...)
	$(SHELL) $(SHELL_SCRIPTS)/install.sh

.PHONY: lint
lint: ### Check the repository coding style.
	$(call header,LINTING...)
	npx eslint .

.PHONY: lint-fix
lint-fix: ### Fix the repository coding style where possible.
	$(call header,LINTING...)
	npx eslint --fix .

.PHONY: format-check
format-check: ### Check the formatting of files.
	$(call header,CHECKING FORMATTING WITH PRETTIER...)
	npx prettier . --check

.PHONY: format-fix
format-fix: ### Correct the formatting of files where possible.
	$(call header,FORMATTING WITH PRETTIER...)
	npx prettier . --write


#############
# Templates #
#############

.PHONY: compile-layouts
compile-layouts: install ### Compiles the layouts for a given service
	$(call header,COMPILING LAYOUTS...)
	$(TSNODE) $(TSNODE_SCRIPTS)/compileLayouts.ts -s=$(SERVICE)

.PHONY: test-templates
test-templates: install ### Tests the templates for a given service
	$(call header,TESTING TEMPLATES...)
	npx validate-templates --serviceNames=$(SERVICE)

.PHONY: generate-payload-schemas
generate-payload-schemas: install ### Tests the templates for a given service
	$(call header,GENERATING PAYLOAD SCHEMAS...)
	npx generate-schemas --serviceNames=$(SERVICE)
	make format-fix

