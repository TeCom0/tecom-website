-- CreateTable
CREATE TABLE "Members" (
    "MemberId" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Position" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("MemberId")
);

-- CreateTable
CREATE TABLE "Events" (
    "EventId" TEXT NOT NULL,
    "EventType" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "Title" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("EventId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Members_MemberId_key" ON "Members"("MemberId");

-- CreateIndex
CREATE UNIQUE INDEX "Events_EventId_key" ON "Events"("EventId");
