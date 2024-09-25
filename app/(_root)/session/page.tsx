import SessionCard from "@/components/SessionCard";
import prisma from "@/prisma";
import { auth } from "@clerk/nextjs/server";

const SessionPage = async () => {
  const { userId } = auth();
  const sessions = await prisma.session.findMany({
    where: {
      creatorId: userId || "",
    },
  });

  return (
    <div className="w-full p-3 h-full flex items-start flex-col justify-start">
      <h1 className="text-3xl font-bold">Session</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center  my-4  overflow-auto custom-scrollbar mb-10">
        {sessions
          .map((session) => (
            <SessionCard
              createdAt={session.createdAt}
              creatorId={session.creatorId}
              description={session.description}
              id={session.id}
              initialTime={session.initialTime}
              isPaused={session.isPaused}
              remainingTime={session.remainingTime}
              status={session.status}
              topic={session.topic}
              key={session.id}
            />
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default SessionPage;
