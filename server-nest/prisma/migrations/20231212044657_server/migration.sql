-- CreateTable
CREATE TABLE "Server" (
    "id" SERIAL NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "memory" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Server_pkey" PRIMARY KEY ("id")
);
