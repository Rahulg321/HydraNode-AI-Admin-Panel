import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100.5,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "3b9c1a1f",
      amount: -25.78,
      status: "failed",
      email: "john.doe@company.com",
    },
    {
      id: "4a8c2e1d",
      amount: 150.0,
      status: "pending",
      email: "alice@example.com",
    },
    {
      id: "5c9f3b2a",
      amount: 75.25,
      status: "pending",
      email: "bob@example.com",
    },
    {
      id: "6d0e4c3b",
      amount: -50.0,
      status: "failed",
      email: "charlie@company.com",
    },
    {
      id: "7f1a5d4c",
      amount: 200.75,
      status: "pending",
      email: "david@example.com",
    },
    {
      id: "8b2f6e5d",
      amount: 300.5,
      status: "pending",
      email: "eve@example.com",
    },
    {
      id: "9c3d7f6e",
      amount: -100.0,
      status: "failed",
      email: "frank@company.com",
    },
    {
      id: "0d4e8g7f",
      amount: 50.25,
      status: "pending",
      email: "grace@example.com",
    },
    {
      id: "1e5f9h8g",
      amount: 125.0,
      status: "pending",
      email: "henry@example.com",
    },
    {
      id: "2f6g0i9h",
      amount: -75.5,
      status: "failed",
      email: "irene@company.com",
    },
    {
      id: "3g7h1j0i",
      amount: 175.75,
      status: "pending",
      email: "jack@example.com",
    },
    {
      id: "4h8i2k1j",
      amount: 225.5,
      status: "pending",
      email: "kate@example.com",
    },
    {
      id: "5i9j3l2k",
      amount: -125.0,
      status: "failed",
      email: "leo@company.com",
    },
    {
      id: "6j0k4m3l",
      amount: 275.25,
      status: "pending",
      email: "mike@example.com",
    },
  ];
}
export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
