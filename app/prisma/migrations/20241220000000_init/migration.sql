-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'New Lead',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "assignedToId" TEXT,
    "parcelId" TEXT,
    "propertyAddress" TEXT,
    "propertyCity" TEXT,
    "propertyState" TEXT,
    "propertyZip" TEXT,
    "county" TEXT,
    "propertyType" TEXT,
    "landUse" TEXT,
    "acres" DOUBLE PRECISION,
    "squareFeet" DOUBLE PRECISION,
    "yearBuilt" INTEGER,
    "bedrooms" INTEGER,
    "bathrooms" DOUBLE PRECISION,
    "ownerName" TEXT,
    "ownerAddress" TEXT,
    "ownerCity" TEXT,
    "ownerState" TEXT,
    "ownerZip" TEXT,
    "ownerPhone" TEXT,
    "ownerEmail" TEXT,
    "mailingAddress" TEXT,
    "mailingCity" TEXT,
    "mailingState" TEXT,
    "mailingZip" TEXT,
    "taxesOwed" DOUBLE PRECISION,
    "yearsDelinquent" INTEGER,
    "saleDate" TIMESTAMP(3),
    "certificateNumber" TEXT,
    "bidAmount" DOUBLE PRECISION,
    "redemptionAmount" DOUBLE PRECISION,
    "interestRate" DOUBLE PRECISION,
    "assessedValue" DOUBLE PRECISION,
    "marketValue" DOUBLE PRECISION,
    "landValue" DOUBLE PRECISION,
    "buildingValue" DOUBLE PRECISION,
    "exemptions" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "subdivision" TEXT,
    "section" TEXT,
    "township" TEXT,
    "range" TEXT,
    "deedBook" TEXT,
    "deedPage" TEXT,
    "platBook" TEXT,
    "platPage" TEXT,
    "legalDescription" TEXT,
    "zoning" TEXT,
    "floodZone" TEXT,
    "schoolDistrict" TEXT,
    "utilities" TEXT,
    "roadAccess" TEXT,
    "waterAccess" TEXT,
    "sewerAccess" TEXT,
    "electricAccess" TEXT,
    "gasAccess" TEXT,
    "internetAccess" TEXT,
    "estimatedValue" DOUBLE PRECISION,
    "repairCosts" DOUBLE PRECISION,
    "marketRent" DOUBLE PRECISION,
    "propertyTaxes" DOUBLE PRECISION,
    "insurance" DOUBLE PRECISION,
    "hoa" DOUBLE PRECISION,
    "leadSource" TEXT,
    "priority" TEXT DEFAULT 'Medium',
    "notes" TEXT,
    "tags" TEXT[],
    "lastContactDate" TIMESTAMP(3),
    "nextFollowUpDate" TIMESTAMP(3),
    "contactAttempts" INTEGER NOT NULL DEFAULT 0,
    "field1" TEXT,
    "field2" TEXT,
    "field3" TEXT,
    "field4" TEXT,
    "field5" TEXT,
    "field6" TEXT,
    "field7" TEXT,
    "field8" TEXT,
    "field9" TEXT,
    "field10" TEXT,
    "field11" TEXT,
    "field12" TEXT,
    "field13" TEXT,
    "field14" TEXT,
    "field15" TEXT,
    "field16" TEXT,
    "field17" TEXT,
    "field18" TEXT,
    "field19" TEXT,
    "field20" TEXT,
    "field21" TEXT,
    "field22" TEXT,
    "field23" TEXT,
    "field24" TEXT,
    "field25" TEXT,
    "field26" TEXT,
    "field27" TEXT,
    "field28" TEXT,
    "field29" TEXT,
    "field30" TEXT,
    "field31" TEXT,
    "field32" TEXT,
    "field33" TEXT,
    "field34" TEXT,
    "field35" TEXT,
    "field36" TEXT,
    "field37" TEXT,
    "field38" TEXT,
    "field39" TEXT,
    "field40" TEXT,
    "field41" TEXT,
    "field42" TEXT,
    "field43" TEXT,
    "field44" TEXT,
    "field45" TEXT,
    "field46" TEXT,
    "field47" TEXT,
    "field48" TEXT,
    "field49" TEXT,
    "field50" TEXT,
    "field51" TEXT,
    "field52" TEXT,
    "field53" TEXT,
    "field54" TEXT,
    "field55" TEXT,
    "field56" TEXT,
    "field57" TEXT,
    "field58" TEXT,
    "field59" TEXT,
    "field60" TEXT,
    "field61" TEXT,
    "field62" TEXT,
    "field63" TEXT,
    "field64" TEXT,
    "field65" TEXT,
    "field66" TEXT,
    "field67" TEXT,
    "field68" TEXT,
    "field69" TEXT,
    "field70" TEXT,
    "field71" TEXT,
    "field72" TEXT,
    "field73" TEXT,
    "field74" TEXT,
    "field75" TEXT,
    "field76" TEXT,
    "field77" TEXT,
    "field78" TEXT,
    "field79" TEXT,
    "field80" TEXT,
    "field81" TEXT,
    "field82" TEXT,
    "field83" TEXT,
    "field84" TEXT,
    "field85" TEXT,
    "field86" TEXT,
    "field87" TEXT,
    "field88" TEXT,
    "field89" TEXT,
    "field90" TEXT,
    "field91" TEXT,
    "field92" TEXT,
    "field93" TEXT,
    "field94" TEXT,
    "field95" TEXT,
    "field96" TEXT,
    "field97" TEXT,
    "field98" TEXT,
    "field99" TEXT,
    "field100" TEXT,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "propertyType" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CallLog" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "callDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER,
    "outcome" TEXT NOT NULL,
    "notes" TEXT,
    "followUpDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CallLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadSession" (
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_county_idx" ON "Lead"("county");

-- CreateIndex
CREATE INDEX "Lead_ownerName_idx" ON "Lead"("ownerName");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX "CallLog_leadId_idx" ON "CallLog"("leadId");

-- CreateIndex
CREATE INDEX "CallLog_callDate_idx" ON "CallLog"("callDate");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallLog" ADD CONSTRAINT "CallLog_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallLog" ADD CONSTRAINT "CallLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

