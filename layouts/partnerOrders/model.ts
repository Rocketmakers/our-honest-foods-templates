/**
 * Specify required object
 *
 * @examples require(".").sampleData
 */

export interface IModel {
  PartnerName: string;
  Orders: {
    OrderName: string;
    AccountName: string;
    SiteName: string;
    Address: string;
    AccessNotes: string;
    DeliveryDate: string;
    Rows: {
      Product: string;
      Quantity: string;
    }[];
    ProductAssemblyNotes: string[];
  }[];
}

export const sampleData: IModel[] = [
  {
    PartnerName: "Total Produce",
    Orders: [
      {
        OrderName: "ORD-123456",
        AccountName: "Example Customer",
        SiteName: "Site A",
        Address: "123 Main Street",
        AccessNotes: "Go round the back and knock on the door",
        DeliveryDate: "2023-11-10",
        Rows: [
          { Product: "Product A", Quantity: "5" },
          { Product: "Product B", Quantity: "2" },
          { Product: "Product C", Quantity: "3" },
        ],
        ProductAssemblyNotes: [
          "This is a note for product A",
          "This is a note for product B",
          "This is a note for product C",
        ],
      },
    ],
  },
];
