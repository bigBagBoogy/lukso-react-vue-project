import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { LSP3MetadataForm } from "./LSP3FEmetaDataFormFE";

describe("LSP3MetadataForm Component", () => {
  it("should render the form", () => {
    const { getByText, getByTestId } = render(<LSP3MetadataForm />);
    const submitButton = getByText("Submit");
    const nameInput = getByTestId("name-input");

    // Ensure the form and its elements are rendered
    expect(submitButton).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  });

  it("should update form data on input change", () => {
    const { getByTestId } = render(<LSP3MetadataForm />);
    const nameInput = getByTestId("name-input");

    // Simulate input change
    fireEvent.change(nameInput, { target: { value: "New Name" } });

    // Verify that the form data is updated
    expect(nameInput.value).toBe("New Name");
  });
});
