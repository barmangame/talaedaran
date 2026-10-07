-- CreateEnum
CREATE TYPE "PlayerApplicationStatus" AS ENUM ('NONE', 'PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'USER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "playerApplicationStatus" "PlayerApplicationStatus" NOT NULL DEFAULT 'NONE',
ALTER COLUMN "role" SET DEFAULT 'USER';
