import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) =>
                    item.children ? (
                        <Select key={item.title} defaultValue={item.children[0].title}>
                            <SelectTrigger className="flex w-full items-center justify-between px-3 py-2">
                                <div className="flex items-center gap-2">
                                    {item.icon && <item.icon className="mr-2" />}
                                    <span>{item.title}</span>
                                </div>
                            </SelectTrigger>
                            <SelectContent className="shadow-lg">
                                <SelectGroup>
                                    {item.children.map((child, i) => (
                                        <SelectItem key={i} value={child.title}>
                                            {child.icon && <child.icon className="mr-2" />}
                                            {child.title}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)}>
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ),
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
