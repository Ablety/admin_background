# admin_background
a simple background management system

2018年9月19

更新内容如下：
1、项目结构微调整
2、App.js页面增加ie9样式的兼容
3、utils工具统一对外导出

2018-09-22

1、升级环境——package;
2、完善浏览器检测内容--utils/browser.js;
3、ie9不支持jwt认证（使用axios库时，header不能设置属性）的暂时代替方案--axios/tools.js;
4、路径别名设置从webpack开发环境和生产环境中提炼出来--config/alias.js;
5、暂时删除分离打包库的配置，后期根据需求在考虑增加；
6、解决ie9样式加载时，APP组件报无效的width--NAN；