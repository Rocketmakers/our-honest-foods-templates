/**
 * Specify required object
 *
 * @examples require(".").sampleData
 */

export interface IModel {
  SendAsPreview: boolean;
  PartnerName: string;
  HubName: string;
  FromDate: string;
  ToDate: string;
  Orders: {
    OrderName: string;
    AccountName: string;
    SiteName: string;
    Address: string;
    AccessNotes: string;
    DeliveryDate: string;
    SiteAccessTimes: string | null;
    LineItems: {
      Product: string;
      Quantity: string;
    }[];
    ProductAssemblyNotes: string[];
  }[];
}

export const sampleData: IModel[] = [
  {
    SendAsPreview: false,
    PartnerName: "Total Produce",
    HubName: "Cornwall",
    FromDate: "6th Dec",
    ToDate: "16th Dec",
    Orders: [
      {
        OrderName: "ORD-123456",
        AccountName: "Example Customer",
        SiteName: "Site A",
        Address: "123 Main Street",
        AccessNotes: "Go round the back and knock on the door",
        DeliveryDate: "2023-11-10",
        SiteAccessTimes: "09:00 - 17:00",
        LineItems: [
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
      {
        OrderName: "ORD-098765",
        AccountName: "Example Customer Two",
        SiteName: "Site B",
        Address: "123 Main Street",
        AccessNotes: "Go round the back and knock on the door",
        DeliveryDate: "2023-11-10",
        SiteAccessTimes: null,
        LineItems: [
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
  {
    SendAsPreview: true,
    PartnerName: "Another Partner",
    HubName: "Bristol",
    FromDate: "6th Dec",
    ToDate: "16th Dec",
    Orders: [
      {
        OrderName: "ORD-000123",
        AccountName: "Some Customer",
        SiteName: "Site Z",
        Address: "123 Main Street",
        AccessNotes: "Go round the back and knock on the door",
        DeliveryDate: "2023-11-10",
        SiteAccessTimes: "08:00 - 16:00",
        LineItems: [
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
      {
        OrderName: "ORD-098765",
        AccountName: "Example Customer Two",
        SiteName: "Site B",
        Address: "123 Main Street",
        AccessNotes: "Go round the back and knock on the door",
        DeliveryDate: "2023-11-10",
        SiteAccessTimes: null,
        LineItems: [
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
