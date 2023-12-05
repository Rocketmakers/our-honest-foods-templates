/**
 * Specify required object
 *
 * @examples require(".").sampleData
 */
export interface IModel {
  orderName: string;
  accountName: string;
  siteName: string;
  address: string;
  accessNotes: string;
  deliveryDate: string;
  rows: {
    product: string;
    quantity: string;
  }[];
  productAssemblyNotes: string[];
}

export const sampleData: IModel[][] = [
  [
    {
      orderName: "ORD-123456",
      accountName: "Example Customer",
      siteName: "Site A",
      address: "123 Main Street",
      accessNotes: "Go round the back and knock on the door",
      deliveryDate: "2023-11-10",
      rows: [
        { product: "Product A", quantity: "5" },
        { product: "Product B", quantity: "2" },
        { product: "Product C", quantity: "3" },
      ],
      productAssemblyNotes: [
        "This is a note for product A",
        "This is a note for product B",
        "This is a note for product C",
      ],
    },
    {
      orderName: "ORD-09876543",
      accountName: "Example Customer Two",
      siteName: "Site B",
      address: "123 Main Street",
      accessNotes: "Go round the front and knock on the door",
      deliveryDate: "2023-11-10",
      rows: [
        { product: "Product A", quantity: "5" },
        { product: "Product B", quantity: "2" },
        { product: "Product C", quantity: "3" },
      ],
      productAssemblyNotes: [
        "This is a note for product A",
        "This is a note for product B",
        "This is a note for product C",
      ],
    },
  ],
];
