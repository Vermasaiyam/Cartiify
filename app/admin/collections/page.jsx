"use client";

import Form from "./components/Form";
import Listview from "./components/Listview";

export default function Page() {
    return (
        <main className="p-5 flex flex-col md:flex-row gap-5">
            <Form />
            <Listview />
        </main>
    );
}