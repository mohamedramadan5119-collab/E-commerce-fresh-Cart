'use client'
import { useEffect } from 'react';

export default function BreadcrumbSetter({ name }: { name: string }) {
  useEffect(() => {
    const event = new CustomEvent("updateBreadcrumb", { detail: name });
    window.dispatchEvent(event);
  }, [name]);

  return null;
}