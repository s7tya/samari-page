import { Link } from "@chakra-ui/react";
import React from "react";

interface BadgeLinkProps {
  children: string;
  href: string;
}

export const BadgeLink: React.FC<BadgeLinkProps> = ({ children, href }) => {
  return (
    <Link
      href={href}
      display="inline-block"
      px="2"
      py="1"
      bg="gray.100"
      rounded="md"
      _hover={{
        textDecoration: "none",
        bg: "gray.300",
      }}
      isExternal
    >
      {children}
    </Link>
  );
};
