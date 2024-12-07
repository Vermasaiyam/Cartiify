"use-client"

import Sidebar from "./components/Sidebar"
import Header from "./components/Header"

export default function Layout({children}){
    return (
        <main className="flex">
            <Sidebar/>
            <section className="flex-1 flex flex-col">
                <Header/>
                <section className="flex-1 bg-[#eff3f4]">
                    {children}
                </section>
            </section>
        </main>
    )
}