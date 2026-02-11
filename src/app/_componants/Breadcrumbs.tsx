"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const routeLabels: { [key: string]: string } = {
  productdetails: "Products",
  brand: "Brands",
  categorydetails: "Category",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [dynamicTitle, setDynamicTitle] = useState("");

  useEffect(() => {
    const handleTitleChange = (e: any) => setDynamicTitle(e.detail);
    window.addEventListener("updateBreadcrumb", handleTitleChange);

    return () => {
      window.removeEventListener("updateBreadcrumb", handleTitleChange);
      setDynamicTitle("");
    };
  }, [pathname]);

  if (pathname === "/" || !pathname) return null;

  const pathNodes = pathname.split("/").filter((node) => node !== "");

  return (
    <nav className="py-4 bg-[#f8f9fa] border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center gap-2 text-[15px]">
        <Link
          href="/"
          className="text-primary font-medium hover:text-green-700 transition-colors"
        >
          Home
        </Link>

        {pathNodes.map((node, index) => {
          const isLast = index === pathNodes.length - 1;
          const nodeLower = node.toLowerCase();
          let href = `/${pathNodes.slice(0, index + 1).join("/")}`;

          if (nodeLower === "productdetails") {
            href = "/products";
          } else if (nodeLower === "categorydetails") {
            href = "/category";
          }

          const label =
            isLast && dynamicTitle
              ? dynamicTitle
              : routeLabels[nodeLower] || node;

          return (
            <React.Fragment key={index}>
              <span className="text-gray-300 font-light">/</span>
              {isLast ? (
                <span className="text-gray-500 capitalize truncate max-w-[200px]">
                  {label.replace(/-/g, " ")}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-primary font-medium capitalize hover:text-green-700 transition-colors"
                >
                  {label.replace(/-/g, " ")}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
