import { NextResponse } from "next/server";

export const responce = (success, statusCode, message, data = null) => {
  return NextResponse.json(
    {
      success,
      message,
      data,
    },
    {
      status: Number.isInteger(statusCode) ? statusCode : 500,
    }
  );
};


export const catchError = (error, customMessage) => {
  console.error(error);

  // duplicate key error
  if (error.code === 11000) {
    const keys = Object.keys(error.keyPattern).join(",");
    return responce(
      false,
      409, // ✅ HTTP conflict
      `Duplicate fields: ${keys}. These values must be unique`
    );
  }

  // default error
  return responce(
    false,
    500, // ✅ ALWAYS valid HTTP status
    customMessage || error.message || "Internal server error",
    process.env.NODE_ENV === "development" ? error : null
  );
};


export const generatOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

export const columnConfig = (
  column,
  isCreatedAt = false,
  isUpdatedAt = false,
  isDeletedAt = false
) => {
  const newColumn = [...column];
  if (isCreatedAt) {
    newColumn.push({
      accessorKey: "createdAt",
      header: "Created At",
      Cell: ({ renderedCellValue }) =>
        new Date(renderedCellValue).toLocaleString(),
    });
  }
  if (isUpdatedAt) {
    newColumn.push({
      accessorKey: "updatedAt",
      header: "Updated At",
      Cell: ({ renderedCellValue }) =>
        new Date(renderedCellValue).toLocaleString(),
    });
  }
  if (isDeletedAt) {
    newColumn.push({
      accessorKey: "deletedAt",
      header: "Deleted At",
      Cell: ({ renderedCellValue }) =>
        new Date(renderedCellValue).toLocaleString(),
    });
  }
  return newColumn;
};

export const statusBatch = (status) => {
  const statusConfig = {
    pending: "bg-blue-500",
    processing: "bg-yellow-500",
    shipped: "bg-cyan-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
    unvarified: "bg-orange-500",
  };
  return (
    <span
      className={`${statusConfig[status]} capitalize px-3 py-1 rounded-full text-xs`}
    >
      {status}
    </span>
  );
};
