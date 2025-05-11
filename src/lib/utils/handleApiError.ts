const handleApiError = (error: unknown) => {
  if (error && typeof error === "object" && "data" in error) {
    const apiError = error as { data: { message: string; status: string } };

    // You can check for specific statuses or return the error message
    if (apiError.data.message) {
      return apiError.data.message;
    }

    // Fallback if message is missing
    return "An error occurred: " + (apiError.data.status || "Unknown error");
  }

  // Fallback for unexpected error types
  return "An unexpected error occurred";
};

export default handleApiError;
