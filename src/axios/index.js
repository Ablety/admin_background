/**
 *Created by:2018/5/8
 *Author:songzhikuan
 */
import api from './tools';

const {get,post,put,del,all}=api;

//机构、审核状态接口

export const commonOrgs=(params)=>get({url:`public/orgs`,params:null});

export const commonStatus=(params)=>get({url:`public/reviews`,params:null});

export const commonAll=(params)=>all([commonOrgs(),commonStatus()]);

//用户

export const login=(params)=>post({url:'login',params:params});

export const logout=(params)=>get({url:'user/logout',params:params});

export const loginInfo=(params)=>get({url:'user/self',params:null});

export const backUser=(params)=>get({url:'user/',params:params});

export const userInfo=(params)=>get({url:`user/${params}`,params:null});

export const deleteUser=(params)=>del({url:`user/${params.id}`,params:null});

export const deleteUsers=(params)=>del({url:'user/',params:params});

export const updateUser=(params)=>post({url:`user/update`,params:params},true);

export const addUser=(params)=>post({url:'user/',params:params},true);

export const select=(params)=>get({url:'user/search',params:params},true);

export const checkName=(params)=>get({url:`user/exist`,params:params},true);

export const userRoles=(params)=>get({url:`user/roles`,params:null},true);

export const userOrgs=(params)=>get({url:`user/orgs`,params:null},true);

export const rolesAndOrgs=(params)=>all([userRoles(),userOrgs()]);

export const userAndRolesAndOrgs=(params)=>all([userInfo(params),userRoles(),userOrgs()]);

export const sysMenus=(params)=>get({url:`user/menus`,params:null});

export const backUserItem=(params)=>get({url:`user/${params}`});

export const auth=()=>get({url:'token/verify'});

//机构

export const orgs=(params)=>get({url:'org/',params:params});

export const addOrg=(params)=>post({url:'org/',params:params});

export const upOrg=(params)=>put({url:`org/`,params:params});

export const org=(params)=>get({url:`org/${params}`,params:null});

export const orgAndOrgs=(params)=>all([orgs(),org(params)]);

export const delOrg=(params)=>del({url:`org/${params}`,params:null});

//角色

export const getRoles=()=>get({url:'user/roles'});

export const addRole=(params)=>post({url:'role/',params:params});

export const role=(params)=>get({url:`role/${params}`,params:null});

export const roleFOrDetail=(params)=>get({url:`/role/${params}/detail`,params:null});

export const upRole=(params)=>put({url:`role/`,params:params});

export const delRole=(params)=>del({url:`role/${params}`,params:null});

export const roles=(params)=>get({url:'role/',params:params});

//权限

export const authorites=(param)=>get({url:'perm/authorities'});

export const menuUrls=(param)=>get({url:'perm/urls'});

export const addPer=(param)=>post({url:'perm/',params:param});

export const pers=(param)=>get({url:'perm/',params:null});

export const per=(param)=>get({url:`perm/${param}`,params:null});

export const upPer=(param)=>put({url:`perm/`,params:param});

export const delPer=(param)=>del({url:`perm/${param}`,params:null});

export const menusTree=(param)=>get({url:'perm/menus',params:param});

export const authoritesAndMenuUrlsAndMenus =()=>all([authorites(),menuUrls(),menusTree()]);

//日志

export const logs=(params)=>get({url:'log/',params:params});


//video 测试

export const video=(params)=>get({url:`${params}`,defineRootAddress:true});



