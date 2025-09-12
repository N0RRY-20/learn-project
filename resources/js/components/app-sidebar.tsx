import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Auth, roles, type NavGroup, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, GraduationCap, LayoutGrid, LucideBinoculars, LucideNotebookPen, Target, UserCheck2Icon } from 'lucide-react';
import AppLogo from './app-logo';

const sidebarNavGroups: NavGroup[] = [
    {
        title: 'Dashboard',
        items: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutGrid,
            },
        ],
    },
    {
        title: 'Data Master',
        roles: ['Admin'],
        items: [
            {
                title: 'Data Guru',
                href: '/teachersData',
                icon: LucideNotebookPen,
                roles: ['Admin'],
            },
            {
                title: 'Data Santri/Santriwati',
                href: '/students',
                icon: GraduationCap,
            },
            {
                title: 'Data User',
                href: '/usersData',
                icon: UserCheck2Icon,
            },
        ],
    },
    {
        title: 'Menu Tahfidz',
        items: [
            {
                title: 'Data Halaqah',
                href: '/datahalaqah', // Pastikan `route` tersedia
                icon: BookOpen,
                roles: ['Admin'],
            },
            {
                title: 'target hafalan',
                href: '/dashboard', // Pastikan `route` tersedia
                icon: Target,
                roles: ['Guru Halaqah'],
            },

            // Tambahkan item lain untuk grup ini jika ada
        ],
    },
    {
        title: 'Menu KBM',
        items: [
            {
                title: 'Data Kelas',
                href: '/datakelas',
                icon: LucideBinoculars,
                roles: ['Admin'],
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
    // sama hallnya seperti disini
];

export function AppSidebar() {
    // 1. Dapatkan role pengguna saat ini
    const { auth } = usePage<{ auth: Auth }>().props;
    const userRole = auth.user.roles.map((r: roles) => r.name);

    // 2. Logika untuk memfilter navigasi
    const filteredNavGroups = sidebarNavGroups
        .map((group) => {
            // Cek apakah grup ini boleh diakses oleh userRole
            const isGroupVisible = !group.roles || group.roles.some((roles) => userRole.includes(roles));

            if (!isGroupVisible) {
                return null; // Jika grup tidak boleh diakses, buang
            }

            // Jika grup boleh diakses, filter item di dalamnya
            const filteredItems = group.items.filter((item) => !item.roles || item.roles.some((roles) => userRole.includes(roles)));

            // Kembalikan grup dengan item yang sudah difilter
            return { ...group, items: filteredItems };
        })
        .filter((group): group is NavGroup => group !== null && group.items.length > 0);
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain groups={filteredNavGroups} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
