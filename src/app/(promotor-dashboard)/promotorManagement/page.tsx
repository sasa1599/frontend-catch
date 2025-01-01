
import CreateEventPage from "@/components/event/createEvent";
import PromotorSidebar from "@/components/ui/prosidebar";

export default function PromotorManagement() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <PromotorSidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen text-black overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Create Your Event Here</h1>
        {/* Create event below here */}
        <div>
         <CreateEventPage/>
        </div>
      </div>
    </div>
  );
}

