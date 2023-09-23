import { useEffect } from "react";
import { useState } from "react";

const Agents = () => {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        fetch('https://vhara-bari-server.vercel.app/agents')
            .then(res => res.json())
            .then(data => setAgents(data));
    }, [])

    return (
        <section className="py-28 bg-green-50">
            <div className="max-w-7xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:items-stretch">
                    <div className="grid p-6 bg-white rounded place-content-center shadow-xl sm:p-8">
                        <div className="max-w-md mx-auto text-center lg:text-left">
                            <header>
                                <h2 className="text-xl font-bold sm:text-3xl uppercase">Agents</h2>

                                <p className="mt-4 text-gray-700">
                                    If you are having trouble finding your dream house, contact any of our agents!
                                </p>
                            </header>
                        </div>
                    </div>

                    <div className="lg:col-span-2 lg:py-8">
                        <ul className="grid grid-cols-2 gap-4">
                            {
                                agents.map((agent) => {
                                    return (
                                        <div key={agent.agent_id} className="group relative block bg-black cursor-pointer shadow-xl rounded-sm" data-aos="flip-right" data-aos-duration="2000">
                                            <img
                                                alt="Developer"
                                                src={agent.image_url}
                                                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                            />

                                            <div className="relative p-4 sm:p-6 lg:p-8">
                                                <p className="text-sm font-medium uppercase tracking-widest text-yellow-400">
                                                    Agent
                                                </p>

                                                <p className="text-xl font-bold text-white sm:text-2xl">{agent.name}</p>

                                                <div className="mt-32 sm:mt-48 lg:mt-64">
                                                    <div
                                                        className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                                    >
                                                        <p className="text-md text-white hidden lg:block">
                                                            {agent.bio}
                                                        </p>
                                                        <div className="flex flex-col lg:flex-row justify-start items-center gap-5 mt-3">
                                                            <a href={`mailto:${agent.email}`} className="text-sm text-black btn btn-warning capitalize md:px-8">
                                                                Email
                                                            </a>
                                                            <a href={`tel:${agent.phone}`} className="text-sm text-white btn bg-emerald-600 hover:bg-emerald-700 border-0 md:px-8 capitalize">
                                                                Call
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Agents;