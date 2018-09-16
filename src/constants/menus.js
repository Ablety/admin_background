export const menus = [
    {key: '/admin/homepage', title: '首页', icon: 'mobile',},
    {
        key: '/admin/system', title: '系统设置', icon: 'setting',
        sub:[
            {key: '/admin/system/userList', title: '用户管理', icon: 'rocket',},
            {key: '/admin/system/roleList', title: '角色管理', icon: 'edit',},
            {key: '/admin/system/menusList', title: '菜单管理', icon: 'copy',},
        ]
    },
];