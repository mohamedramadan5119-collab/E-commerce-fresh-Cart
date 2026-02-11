"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import userImage from '../../../aassets/images/profile.jpg'

export function DropdownMenuBasic({ logout }: { logout: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image className=" cursor-pointer rounded-full" src={userImage} width={40} height={40} alt="user" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={'/profile'}>profile</Link>
            </DropdownMenuItem>
          <DropdownMenuItem>
            <span onClick={logout} className=" cursor-pointer">Logout</span>
            </DropdownMenuItem>
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
