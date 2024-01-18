import { create } from 'zustand';

type SidebarStore = {
  isDropdownSmClicked: boolean;
  setDropdownSmClicked: (clicked: boolean) => void;
  showSmallNav: boolean;
  setShowSmallNav: (show: boolean) => void;
  // State for tracking whether the sidebar collapsed or not
  collapsed: boolean;
  setCollapsed: (isCollapsed: boolean) => void;
  // Two types of keys for managing the active state of the sidebar:
  //  ****** selectedKeys - for menu items
  //  ****** openKeys - for menu items which have children items
  selectedKeys: string[];
  setSelectedKeys: (keys: string[]) => void;
  openKeys: string[];
  setOpenKeys: (keys: string[]) => void;
  // This functiion responsible for selecting the active keys
  handleMenuItemSelect: (params: {
    key: string;
    keyPath: string[];
    selectedKeys: string[];
  }) => void;
  // The function responsible for opening the menu items which have child items
  handleOpenSubMenu: (keys: string[]) => void;
};

const useSidebarStore = create<SidebarStore>((set) => ({
  isDropdownSmClicked: false,
  setDropdownSmClicked: (clicked) => set({ isDropdownSmClicked: clicked }),
  showSmallNav: false,
  setShowSmallNav: (show) => set({ showSmallNav: show }),
  collapsed: false,
  setCollapsed: (isCollapsed) => set({ collapsed: isCollapsed }),
  selectedKeys: [],
  setSelectedKeys: (keys) => set({ selectedKeys: keys }),
  openKeys: [],
  setOpenKeys: (keys) => set({ openKeys: keys }),
  handleMenuItemSelect: ({
    key,
    keyPath,
    selectedKeys,
  }: {
    key: string;
    keyPath: string[];
    selectedKeys: string[];
  }) => {
    if (keyPath.length > 1) {
      set({ selectedKeys: [key] });
    } else {
      set({ selectedKeys });
      set({ openKeys: [] });
    }
  },
  handleOpenSubMenu: (keys: string[]) => {
    set({ selectedKeys: [keys[keys.length - 1]] });
    set({ openKeys: [] });

    if (keys.length > 0) {
      set({ openKeys: [keys[keys.length - 1]] });
    }
  },
}));

export default useSidebarStore;
