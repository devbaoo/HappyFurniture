import React from "react";
import { Button } from "./Button";

interface FormWrapperProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function FormWrapper({
  children,
  onSubmit,
  className = "",
  submitText = "Lưu",
  cancelText = "Hủy",
  onCancel,
  isSubmitting = false,
}: FormWrapperProps) {
  return (
    <form onSubmit={onSubmit} className={`space-y-5 ${className}`}>
      {children}
      {(onCancel || submitText) && (
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isSubmitting}>
              {cancelText}
            </Button>
          )}
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Đang xử lý..." : submitText}
          </Button>
        </div>
      )}
    </form>
  );
}
