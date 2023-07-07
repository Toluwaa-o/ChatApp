"use client";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Header from "./Chats/Header";

const SkeletonUI = () => {
  return (
    <div className="p-4 grid gap-5 h-screen w-screen overflow-hidden md:flex">
      <span className="grid gap-5 md:w-[30%]">
        <span className="md:w-[25vw]">
          <Header />
        </span>
        <Stack className="grid gap-4" spacing={1}>
          <span className="flex justify-between md:w-[25vw]">
            <Skeleton variant="circular" width={53} height={53} />
            <Skeleton variant="circular" width={53} height={53} />
            <Skeleton variant="circular" width={53} height={53} />
            <Skeleton variant="circular" width={53} height={53} />
            <Skeleton variant="circular" width={53} height={53} />
          </span>

          <span className="grid gap-4">
            <span className="flex gap-2 items-center overflow-x-hidden">
              <Skeleton variant="circular" width={53} height={53} />
              <Skeleton variant="rounded" width={285} height={50} />
            </span>

            <span className="flex gap-2 items-center overflow-x-hidden">
              <Skeleton variant="circular" width={53} height={53} />
              <Skeleton variant="rounded" width={285} height={50} />
            </span>

            <span className="flex gap-2 items-center overflow-x-hidden">
              <Skeleton variant="circular" width={53} height={53} />
              <Skeleton variant="rounded" width={285} height={50} />
            </span>

            <span className="flex gap-2 items-center overflow-x-hidden">
              <Skeleton variant="circular" width={53} height={53} />
              <Skeleton variant="rounded" width={285} height={50} />
            </span>

            <span className="flex gap-2 items-center overflow-x-hidden">
              <Skeleton variant="circular" width={53} height={53} />
              <Skeleton variant="rounded" width={285} height={50} />
            </span>

            <span className="flex gap-2 items-center overflow-x-hidden">
              <Skeleton variant="circular" width={53} height={53} />
              <Skeleton variant="rounded" width={285} height={50} />
            </span>

            <span className="flex gap-2 items-center overflow-x-hidden">
              <Skeleton variant="circular" width={53} height={53} />
              <Skeleton variant="rounded" width={285} height={50} />
            </span>

            <span className="flex gap-2 items-center overflow-x-hidden">
              <Skeleton variant="circular" width={53} height={53} />
              <Skeleton variant="rounded" width={285} height={50} />
            </span>

            <span className="flex gap-2 items-center overflow-x-hidden">
              <Skeleton variant="circular" width={53} height={53} />
              <Skeleton variant="rounded" width={285} height={50} />
            </span>

            <span className="flex gap-2 items-center overflow-x-hidden">
              <Skeleton variant="circular" width={53} height={53} />
              <Skeleton variant="rounded" width={285} height={50} />
            </span>
          </span>
        </Stack>
      </span>
      <span className="overflow-x-hidden hidden gap-6 md:grid">
        <span className="flex gap-2 items-center overflow-x-hidden w-[100%]">
          <Skeleton variant="circular" width={53} height={53} />
          <Skeleton variant="rounded" width={900} height={50} />
        </span>

        <span className="flex gap-2 flex-col overflow-x-hidden w-[100%]">
          <Skeleton
            className="self-start"
            variant="rounded"
            width={400}
            height={100}
          />
          <Skeleton
            className="self-end"
            variant="rounded"
            width={200}
            height={50}
          />
          <Skeleton
            className="self-end"
            variant="rounded"
            width={400}
            height={100}
          />
          <Skeleton
            className="self-start"
            variant="rounded"
            width={400}
            height={60}
          />
          <Skeleton
            className="self-end"
            variant="rounded"
            width={400}
            height={60}
          />
          <Skeleton
            className="self-start"
            variant="rounded"
            width={400}
            height={100}
          />
          <Skeleton
            className="self-end"
            variant="rounded"
            width={400}
            height={100}
          />
        </span>
      </span>
    </div>
  );
};
export default SkeletonUI;
