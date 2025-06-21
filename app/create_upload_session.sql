CREATE TABLE IF NOT EXISTS "UploadSession" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "totalRecords" INTEGER NOT NULL,
    "successRecords" INTEGER NOT NULL,
    "errorRecords" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Processing',
    "errors" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    CONSTRAINT "UploadSession_pkey" PRIMARY KEY ("id")
);
