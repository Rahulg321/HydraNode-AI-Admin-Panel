import { redirect } from "next/navigation";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import db from "@/lib/db";
import { UserRole } from "@prisma/client";

export type CustomUser = {
    id: string;
    name: string | null
    email: string
    hasLifetimeAccess: boolean;
    role: UserRole;
}
const AdminPage = async () => {

    const data = await db.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            hasLifetimeAccess: true,
            role: true
        }
    });

    return (
        <>
            <section className="block-space big-container">
                <div>
                    <h2>Admin Dashboard</h2>
                </div>
                <div className="container mx-auto py-10">
                    <DataTable columns={columns} data={data} />
                </div>
            </section>
        </>
    );
};

export default AdminPage;
