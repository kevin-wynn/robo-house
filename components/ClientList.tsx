export const ClientList = ({ clients }: { clients: any }) => {
  return (
    <div className="flex flex-col">
      {clients.map((client: any) => (
        <div key={client.id}>
          <h2 className="text-2xl text-spice font-serif">Clients</h2>
          <p>{client.name}</p>
        </div>
      ))}
    </div>
  );
};
