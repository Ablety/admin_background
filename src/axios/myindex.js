/**
 *Created by:2018/5/8
 *Author:songzhikuan
 */
import api from './newTools';

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

//教育局资讯

export const jyjNewsList=(params)=>get({url:'info/eb/',params:params});

export const jyjNews=(params)=>get({url:`info/eb/${params}`,params:null});

export const jyjNewsAdd=(params)=>post({url:`info/eb/`,params:params});

export const jyjNewsUp=(params)=>put({url:`info/eb/`,params:params});

export const jyjNewsDel=(params)=>del({url:`info/eb/${params}`,params:null});


//成果展示

export const cgNewsList=(params)=>get({url:'info/rd/',params:params});

export const xzcgNewsList=(params)=>get({url:'info/rd/principal',params:params});

export const jscgNewsList=(params)=>get({url:'info/rd/teacher',params:params});

export const cgNews=(params)=>get({url:`info/rd/${params}`,params:null});

export const cgNewsAdd=(params)=>post({url:`info/rd/teacher`,params:params});

export const cgNewsPassed=(params)=>put({url:`info/rd/${params.id}/1`,params:null});

export const cgNewsPassing=(params)=>put({url:`info/rd/${params.id}/-1`,params:params});

export const cgNewsUp=(params)=>put({url:`info/rd/`,params:params});

export const cgNewsDel=(params)=>del({url:`info/rd/${params}`,params:null});

export const cgAll=(params)=>all([commonOrgs(),commonStatus(),cgNews(params)]);

//学校资讯

export const xxNewsList=(params)=>get({url:'info/sn/',params:params});

export const xzxxNewsList=(params)=>get({url:'info/sn/principal',params:params});

export const jsxxNewsList=(params)=>get({url:'info/sn/teacher',params:params});

export const xxNews=(params)=>get({url:`info/sn/${params}`,params:null});

export const xxNewsAdd=(params)=>post({url:`info/sn/teacher`,params:params});

export const xxNewsPassed=(params)=>put({url:`info/sn/${params.id}/1`,params:null});

export const xxNewsPassing=(params)=>put({url:`info/sn/${params.id}/-1`,params:params});

export const xxNewsUp=(params)=>put({url:`info/sn/`,params:params});

export const xxNewsDel=(params)=>del({url:`info/sn/${params}`,params:null});

export const xxAll=(params)=>all([commonOrgs(),commonStatus(),xxNews(params)]);


//学校资源

export const zyList=(params)=>get({url:'info/sr/',params:params});

export const xzzyList=(params)=>get({url:'info/sr/principal',params:params});

export const jszyList=(params)=>get({url:'info/sr/teacher',params:params});

export const zy=(params)=>get({url:`info/sr/${params}`,params:null});

export const zyAdd=(params)=>post({url:`info/sr/teacher`,params:params});

export const zyPassed=(params)=>put({url:`info/sr/${params.id}/1`,params:null});

export const zyPassing=(params)=>put({url:`info/sr/${params.id}/-1`,params:params});

export const zyUp=(params)=>put({url:`info/sr/`,params:params});

export const zyType=(params)=>get({url:`info/sr/restypes`,params:params});

export const zyDel=(params)=>del({url:`info/sr/${params}`,params:null});

export const zyAddAll=(params)=>all([commonOrgs(),commonStatus(),zyType()]);

export const zyAll=(params)=>all([commonOrgs(),commonStatus(),zy(params),zyType()]);


//课程大类

export const courceCategariesList=(params)=>get({url:'lessontype/',params:params});

export const course=(params)=>get({url:'lessontype/'+params,params:null});

export const courseAdd=(params)=>post({url:'lessontype/',params:params});

export const courseUp=(params)=>put({url:`lessontype/`,params:params});

export const courseDel=(params)=>del({url:`lessontype/${params}`,params:null});

export const courseSelect=(params)=>get({url:`lessontype/${params}`,params:null});

export const courseNameCheck=(params)=>get({url:`lessontype/verify/${params}`,params:null});

//开班计划

export const getCategaries=(params)=>get({url:`op/lts/`,params:null});

export const classPlan=(params)=>post({url:`op/`,params:params});

export const upClassPlan=(params)=>put({url:`op/`,params:params});

export const classPlans=(params)=>get({url:`op/`,params:params});

export const getClassPlan=(params)=>get({url:`op/${params}`,params:null});

export const delClassPlan=(params)=>del({url:`op/${params}`,params:null});

export const startClass=(params)=>put({url:`op/${params}/switch`,params:null});

//课程

export const courses=(params)=>get({url:`course/`,params:params});

export const courseDetail=(params)=>get({url:`course/${params}`,params:null});

export const addCourse=(params)=>post({url:`course/`,params:params});

export const upCourse=(params)=>put({url:`course/`,params:params});

export const delCourse=(params)=>del({url:`course/${params}`,params:null});

//学员

export const stus=(params)=>get({url:`student/${params}/add`,params:null});

export const attendStus=(params)=>get({url:`student/`,params:params});

export const addStu=(params)=>post({url:`student/`,params:params});

export const addStus=(params)=>post({url:`student/batch`,params:params});

export const delStu=(params)=>del({url:`student/${params}`,params:params});

export const chooseGroup=(params)=>put({url:`student/group`,params:params});

//分组

export const groups=(params)=>get({url:'cg/',params:params});

export const groupsById=(params)=>get({url:`/cg/${params}/groups`,params:null});

export const upGroups=(params)=>put({url:'cg/',params:params});

export const delGroups=(params)=>del({url:`cg/${params}`,params:null});

export const addGroup=(params)=>post({url:'cg/',params:params});

export const clStus=(params)=>get({url:`cg/${params}/grouping`,params:null});

export const addClStus=(params)=>post({url:`cg/addstus`,params:params});

export const clGroupStus=(params)=>get({url:`cg/${params}/students`,params:null});

//模板

export const templates=(params)=>get({url:'ht/',params:null});

export const template=(params)=>get({url:`ht/${params}`,params:null});

export const addTemplate=(params)=>post({url:'ht/',params:params});

export const upTemplate=(params)=>put({url:`ht/`,params:params});

export const delTemplate=(params)=>del({url:`ht/${params}`,params:null});

export const checkTemplate=(params)=>get({url:`ht/verify/${params}`,params:null});

//教研动态

export const addDyNew=(params)=>post({url:`tn/`,params:params});

export const tAddDyNew=(params)=>post({url:`tn/teacher`,params:params});

export const delDyNew=(params)=>del({url:`tn/${params}`,params:null});

export const upDyNew=(params)=>put({url:`tn/`,params:params});

export const dyNew=(params)=>get({url:`tn/${params}/info`,params:null});

export const dyNews=(params)=>get({url:`tn/`,params:params});

export const jsdyNews=(params)=>get({url:`tn/teacher`,params:params});

export const dyOrgs=(params)=>get({url:`tn/orgs`,params:null});

export const dyStatus=(params)=>get({url:`tn/reviews`,params:null});

export const dyPassed=(params)=>put({url:`tn/${params.id}/1`,params:null});

export const dyPassing=(params)=>put({url:`tn/${params.id}/-1`,params:params});

export const dyAll=(params)=>all([commonOrgs(),commonStatus()]);

//视频微课

export const addVideo=(params)=>post({url:`ml/`,params:params});

export const tAddVideo=(params)=>post({url:`ml/teacher`,params:params});

export const delVideo=(params)=>del({url:`ml/${params}`,params:null});

export const upVideo=(params)=>put({url:`ml/`,params:params});

export const video=(params)=>get({url:`ml/${params}/info`,params:null});

export const videos=(params)=>get({url:`ml/`,params:params});

export const jsVideos=(params)=>get({url:`ml/teacher`,params:params});

export const videoPassed=(params)=>put({url:`ml/${params.id}/1`,params:null});

export const videoPassing=(params)=>put({url:`ml/${params.id}/-1`,params:params});

export const videosAll=(params)=>all([commonOrgs(),video(params)]);



//阶段助学

export const addMaterial=(params)=>post({url:`ss/`,params:params});

export const tAddMaterial=(params)=>post({url:`ss/teacher`,params:params});

export const delMaterial=(params)=>del({url:`ss/${params}`,params:null});

export const upMaterial=(params)=>put({url:`ss/`,params:params});

export const material=(params)=>get({url:`ss/${params}/info`,params:null});

export const materials=(params)=>get({url:`ss/`,params:params});

export const jsMaterials=(params)=>get({url:`ss/teacher`,params:params});

export const materialsPassed=(params)=>put({url:`ss/${params.id}/1`,params:null});

export const materialsPassing=(params)=>put({url:`ss/${params.id}/-1`,params:params});

export const mOrgs=(params)=>get({url:`ss/orgs`,params:null});

export const mStatus=(params)=>get({url:`ss/reviews`,params:null});

export const mTypes=(params)=>get({url:`ss/types`,params:null});

export const mAll=(params)=>all([commonOrgs(),mTypes(),commonStatus(),material(params)]);

export const mAddAll=(params)=>all([commonOrgs(),mTypes(),commonStatus()]);

//教研管理

export const addSubjectMaterial=(params)=>post({url:`em/`,params:params});

export const tAddSubjectMaterial=(params)=>post({url:`em/teacher`,params:params});

export const delSubjectMaterial=(params)=>del({url:`em/${params}`,params:null});

export const upSubjectMaterial=(params)=>put({url:`em/`,params:params});

export const subjectMaterial=(params)=>get({url:`em/${params}/info`,params:null});

export const subjectMaterialPassed=(params)=>put({url:`em/${params.id}/1`,params:null});

export const subjectMaterialPassing=(params)=>put({url:`em/${params.id}/-1`,params:params});

export const subjectMaterials=(params)=>get({url:`em/`,params:params});

export const jsSubjectMaterials=(params)=>get({url:`em/teacher`,params:params});

export const sStatus=(params)=>get({url:`em/reviews`,params:null});

export const sOrgs=(params)=>get({url:`em/orgs`,params:null});

export const sAll=(params)=>all([commonOrgs(),commonStatus()]);

export const sModAll=(params)=>all([commonOrgs(),commonStatus(),subjectMaterial(params)]);

//学科交流

export const addCommunicationMaterial=(params)=>post({url:`se/`,params:params});

export const tAddCommunicationMaterial=(params)=>post({url:`se/teacher`,params:params});

export const delCommunicationMaterial=(params)=>del({url:`se/${params}`,params:null});

export const upCommunicationMaterial=(params)=>put({url:`se/`,params:params});

export const communicationMaterial=(params)=>get({url:`se/${params}/info`,params:null});

export const communicationMaterialPassed=(params)=>put({url:`se/${params.id}/1`,params:null});

export const communicationMaterialPassing=(params)=>put({url:`se/${params.id}/-1`,params:params});

export const communicationMaterials=(params)=>get({url:`se/`,params:params});

export const jsCommunicationMaterials=(params)=>get({url:`se/teacher`,params:params});

export const cStatus=(params)=>get({url:`se/reviews`,params:null});

export const cOrgs=(params)=>get({url:`se/orgs`,params:null});

export const cAll=(params)=>all([commonOrgs(),commonStatus()]);

export const cModAll=(params)=>all([commonOrgs(),commonStatus(),communicationMaterial(params)]);

