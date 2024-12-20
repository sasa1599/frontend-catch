import CreateTicketPage from "@/components/ticket/createTicket";
import PromotorSidebar from "@/components/ui/prosidebar";

export default function PromotorManagement({
  params,
}: {
  params: { event_id: string };
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <PromotorSidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen text-black overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Create Your Ticket Here</h1>
        {/* Create ticket below here */}
        <div>
          <CreateTicketPage params={params} />
        </div>
      </div>
    </div>
  );
}
