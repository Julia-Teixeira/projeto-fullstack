-- CreateTable
CREATE TABLE "client" (
    "id" UUID NOT NULL,
    "full_name" VARCHAR(125) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(16) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "image" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" UUID NOT NULL,
    "full_name" VARCHAR(125) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(16) NOT NULL,
    "image" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" UUID NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contact_email_key" ON "contact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contact_phone_key" ON "contact"("phone");

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
