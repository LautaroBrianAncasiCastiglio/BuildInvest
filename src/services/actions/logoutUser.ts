"use server";

import SessionManager from "@/services/SessionManager";
import { redirect } from "next/navigation";

export async function logoutUser() {
    SessionManager.deleteSession();
    redirect("/");
}
