module.exports = (plop) => {
  plop.addHelper("upperCase", (text) => text.toUpperCase());
  plop.addHelper("lowerCase", (text) => text.toLowerCase());
  plop.addHelper("removeVietnamese", function (text) {
    text = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    text = text.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    text = text.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    text = text.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    text = text.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    text = text.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    text = text.replace(/đ/g, "d");
    text = text.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    text = text.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    text = text.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I"),
      text = text.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    text = text.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    text = text.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    text = text.replace(/Đ/g, "D");
    text = text.toLowerCase();
    text = text.replace(/[&]/g, "-and-").replace(/[^a-zA-Z0-9._-]/g, "_").replace(/[-]+/g, "-").replace(/-$/, "");
    return text;
  });

  plop.setGenerator("component", {
    description: "Generate a react component, functional component",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "What is the name of your component? Example: Posts, Users, Project...",
      },
      {
        type: "list",
        name: "type",
        message: "What is the type of your component?",
        default: "default",
        choices: [
          { name: "Simple component", value: "default" },
          { name: "Redux connected component", value: "connect-redux" },
        ],
      },
      {
        type: "list",
        name: "folder",
        message:
          "You want to create a single file component or a component in folder?",
        default: "single",
        choices: [
          { name: "Single file", value: "single" },
          { name: "Folder", value: "folder" },
        ],
      },
      {
        type: "list",
        name: "position",
        message: "Where do you want to place the component?",
        default: "components",
        choices: [
          { name: "In components folder", value: "components" },
          { name: "In containers folder", value: "containers" },
        ],
      },
    ],
    actions: (data) => {
      console.log(data);
      if (data.type === "connect-redux") {
        if (data.folder === "folder") {
          return [
            {
              type: "add",
              path: "client/src/{{position}}/{{pascalCase name}}/{{pascalCase name}}.js",
              templateFile: "generator/component/ReduxComponent.js.hbs",
              skipIfExists: true,
            },
          ];
        }
        return [
          {
            type: "add",
            path: "client/src/{{position}}/{{pascalCase name}}.js",
            templateFile: "generator/component/ReduxComponent.js.hbs",
            skipIfExists: true,
          },
        ];
      }
      if (data.folder === "folder") {
        return [
          {
            type: "add",
            path: "client/src/{{position}}/{{pascalCase name}}/{{pascalCase name}}.js",
            templateFile: "generator/component/DefaultComponent.js.hbs",
            skipIfExists: true,
          },
        ];
      }
      return [
        {
          type: "add",
          path: "client/src/{{position}}/{{pascalCase name}}.js",
          templateFile: "generator/component/DefaultComponent.js.hbs",
          skipIfExists: true,
        },
      ];
    },
  });
  plop.setGenerator("redux", {
    description: "Generate a redux",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "What is the name of your redux? Example: post, user, project...",
      },
      {
        type: "input",
        name: "name_vi",
        message:
          "What is the vietnames name of your redux? Example: bài viết, thành viên, dự án...",
      },
      {
        type: "input",
        name: "key",
        message:
          "What is the primary key of your redux? Example: thanh_vien_id, thong_bao_id...",
      },
      {
        type: "input",
        name: "key_category",
        message:
          "What is the primary key of your redux? Example: nhom_thanh_vien_id, nhom_thong_bao_id...",
      },
    ],
    actions: (data) => {
      console.log(data);
      return [
        // action files
        {
          type: "add",
          path: "client/src/redux/sagas/{{lowerCase name}}.js",
          templateFile: "generator/redux/saga.js.hbs",
          skipIfExists: true,
        },
        /* {
          type: "add",
          path: "client/src/redux/actions/{{lowerCase name}}.js",
          templateFile: "generator/redux/action.js.hbs",
          skipIfExists: true,
        }, */
        /*  {
           type: "append",
           path: "client/src/redux/actions/index.js",
           pattern: /(\/\/ IMPORT ACTIONS)/g,
           template:
             "import * as {{lowerCase name}}  from './{{lowerCase name}}';",
         },
         {
           type: "append",
           path: "client/src/redux/actions/index.js",
           pattern: /(\/\/ EXPORT ACTIONS)/g,
           template: "  {{lowerCase name}},", 
         },*/
        // reducer files
        /*  {
           type: "add",
           path: "client/src/redux/reducers/{{lowerCase name}}.js",
           templateFile: "generator/redux/reducer.js.hbs",
           skipIfExists: true,
         }, */
        /*  {
           type: "append",
           path: "client/src/redux/reducers/index.js",
           pattern: /(\/\/ IMPORT REDUCERS)/g,
           template: "import {{lowerCase name}}  from './{{lowerCase name}}';",
         },
         {
           type: "append",
           path: "client/src/redux/reducers/index.js",
           pattern: /(\/\/ EXPORT REDUCERS)/g,
           template: "  {{lowerCase name}},",
         }, */
        // saga files
        /*
       
        {
          type: "append",
          path: "client/src/redux/sagas/index.js",
          pattern: /(\/\/ IMPORT SAGAS)/g,
          template: `import {
              load{{pascalCase name}},
              load{{pascalCase name}}s,
              loadDelete{{pascalCase name}},
              loadDelete{{pascalCase name}}s,
              loadCreate{{pascalCase name}},
              loadEdit{{pascalCase name}},
              load{{pascalCase name}}Cates,
              loadCreate{{pascalCase name}}Cate,
              loadEdit{{pascalCase name}}Cate,
              loadDelete{{pascalCase name}}Cate,
              loadDelete{{pascalCase name}}Cates,
            } from './{{lowerCase name}}';
            `,
        },
        {
          type: "append",
          path: "client/src/redux/sagas/index.js",
          pattern: /(\/\/ EXPORT SAGAS)/g,
          template: `
            // {{lowerCase name}}
            load{{pascalCase name}}(),
            load{{pascalCase name}}s(),
            loadDelete{{pascalCase name}}(),
            loadDelete{{pascalCase name}}s(),
            loadCreate{{pascalCase name}}(),
            loadEdit{{pascalCase name}}(),
            load{{pascalCase name}}Cates(),
            loadCreate{{pascalCase name}}Cate(),
            loadEdit{{pascalCase name}}Cate(),
            loadDelete{{pascalCase name}}Cates(),
            loadDelete{{pascalCase name}}Cate(),
          `,
        },
          {
          type: "append",
          path: "client/src/constants/languages/en.js",
          pattern: /(\/\/ DEFINE EN MESSAGES)/g,
          template: `// {{lowerCase name}}
            GET_{{upperCase name}}_SUCCESS: 'Get {{lowerCase name}} successfully',
            GET_{{upperCase name}}_FAIL: 'Get {{lowerCase name}} failed',
            GET_{{upperCase name}}S_SUCCESS: 'Get {{lowerCase name}}s successfully',
            GET_{{upperCase name}}S_FAIL: 'Get {{lowerCase name}}s failed',
            CREATE_{{upperCase name}}_SUCCESS: 'Create a new {{lowerCase name}} successfully',
            CREATE_{{upperCase name}}_FAIL: 'Create a new {{lowerCase name}} failed',
            UPDATE_{{upperCase name}}_SUCCESS: 'Update {{lowerCase name}} successfully',
            UPDATE_{{upperCase name}}_FAIL: 'Update {{lowerCase name}} failed',
            DELETE_{{upperCase name}}_SUCCESS: 'Delete {{lowerCase name}} successfully',
            DELETE_{{upperCase name}}_FAIL: 'Delete {{lowerCase name}} failed',
            GET_{{upperCase name}}_CATES_SUCCESS: 'Get {{lowerCase name}} categories successfully',
            GET_{{upperCase name}}_CATES_FAIL: 'Get {{lowerCase name}} categories failed',
            UPDATE_{{upperCase name}}_CATE_SUCCESS: 'Update {{lowerCase name}} category successfully',
            UPDATE_{{upperCase name}}_CATE_FAIL: 'Update {{lowerCase name}} category failed',
            CREATE_{{upperCase name}}_CATE_SUCCESS: 'Create {{lowerCase name}} category successfully',
            CREATE_{{upperCase name}}_CATE_FAIL: 'Create {{lowerCase name}} category failed',
            DELETE_{{upperCase name}}_CATE_SUCCESS: 'Delete {{lowerCase name}} category successfully',
            DELETE_{{upperCase name}}_CATE_FAIL: 'Delete {{lowerCase name}} category failed',
          `,
        }, 
         {
          type: "append",
          path: "client/src/constants/languages/vi.js",
          pattern: /(\/\/ DEFINE VI MESSAGES)/g,
          template: `// {{lowerCase name}}
            GET_{{upperCase name}}_SUCCESS: 'Tải dữ liệu {{lowerCase name_vi}} thành công',
            GET_{{upperCase name}}_FAIL: 'Tải dữ liệu {{lowerCase name_vi}} thất bại',
            GET_{{upperCase name}}S_SUCCESS: 'Tải danh {{lowerCase name_vi}} thành công',
            GET_{{upperCase name}}S_FAIL: 'Tải danh sách {{lowerCase name_vi}} thất bại',
            CREATE_{{upperCase name}}_SUCCESS: 'Tạo {{lowerCase name_vi}} thành công',
            CREATE_{{upperCase name}}_FAIL: 'Tạo {{lowerCase name_vi}} thất bại',
            UPDATE_{{upperCase name}}_SUCCESS: 'Cập nhật {{lowerCase name_vi}} thành công',
            UPDATE_{{upperCase name}}_FAIL: 'Cập nhật {{lowerCase name_vi}} thất bại',
            DELETE_{{upperCase name}}_SUCCESS: 'Xóa {{lowerCase name_vi}} thành công',
            DELETE_{{upperCase name}}_FAIL: 'Xóa {{lowerCase name_vi}} thất bại',
            GET_{{upperCase name}}_CATES_SUCCESS: 'Tải danh mục {{lowerCase name_vi}} thành công',
            GET_{{upperCase name}}_CATES_FAIL: 'Tải danh mục {{lowerCase name_vi}} thất bại',
            UPDATE_{{upperCase name}}_CATE_SUCCESS: 'Cập nhật danh mục {{lowerCase name_vi}} thành công',
            UPDATE_{{upperCase name}}_CATE_FAIL: 'Cập nhật danh mục {{lowerCase name_vi}} thất bại',
            CREATE_{{upperCase name}}_CATE_SUCCESS: 'Tạo mới danh mục {{lowerCase name_vi}} thành công',
            CREATE_{{upperCase name}}_CATE_FAIL: 'Tạo mới danh mục {{lowerCase name_vi}} thất bại',
            DELETE_{{upperCase name}}_CATE_SUCCESS: 'Xóa danh mục {{lowerCase name_vi}} thành công',
            DELETE_{{upperCase name}}_CATE_FAIL: 'Xóa danh mục {{lowerCase name_vi}} thất bại',
          `,
        },  */
      ];
    },
  });
  plop.setGenerator("api", {
    description: "Generate a CRUD API",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "What is the name of your api? Example: post, project, user...",
      },
      {
        type: "input",
        name: "name_vi",
        message:
          "What is the vietnames name of your redux? Example: bài viết, thành viên, dự án...",
      },
      {
        type: "input",
        name: "key",
        message:
          "What is the name of primary key? Example: thong_bao_id, thanh_vien_id...",
      },
      {
        type: "input",
        name: "key_category",
        message:
          "What is the name of primary key of category ? Example: nhom_thong_bao_id, nhom_thanh_vien_id...",
      },
    ],
    actions: (data) => {
      console.log(data);
      return [
        // model files
        {
          type: "add",
          path: "backend/src/routers/{{lowerCase name}}s/{{lowerCase name}}.ctrl.js",
          templateFile: "generator/api/controller.js.hbs",
          skipIfExists: true,
        },
        {
          type: "add",
          path: "backend/src/routers/{{lowerCase name}}s/router.js",
          templateFile: "generator/api/route.js.hbs",
          skipIfExists: true,
        },
        {
          type: "add",
          path: "backend/src/routers/{{lowerCase name}}s/category.ctrl.js",
          templateFile: "generator/api/controller-category.js.hbs",
          skipIfExists: true,
        },
        {
          type: "append",
          path: "backend/src/routers/index.js",
          pattern: `// ADD ROUTER`,
          template: `router.use(require('./{{lowerCase name}}s/router'));`,
        },
      ];
    },
  });
  plop.setGenerator("module", {
    description: "Generate a client module",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "What is the name of your module/page? Example: post, project, user...",
      },
      {
        type: "input",
        name: "title",
        message:
          "What is the title of your module/page? Example: sản phẩm, dự án, bài viết...",
      },
      {
        type: "input",
        name: "key",
        message:
          "What is the name of primary key? Example: thong_bao_id, thanh_vien_id...",
      },
      {
        type: "input",
        name: "key_category",
        message:
          "What is the name of primary key of category ? Example: nhom_thong_bao_id, nhom_thanh_vien_id...",
      },
    ],
    actions: (data) => {
      console.log(data);
      return [
        {
          type: "add",
          path: "client/src/containers/{{lowerCase name}}/{{pascalCase name}}.js",
          templateFile: "generator/page/Page.js.hbs",
          skipIfExists: true,
        },

        {
          type: "add",
          path: "client/src/containers/{{lowerCase name}}/{{pascalCase name}}Form.js",
          templateFile: "generator/page/PageForm.js.hbs",
          skipIfExists: true,
        },
        {
          type: "add",
          path: "client/src/containers/{{lowerCase name}}/{{pascalCase name}}Category.js",
          templateFile: "generator/page/PageCategory.js.hbs",
          skipIfExists: true,
        },
/*
        {
          type: "append",
          path: "client/src/constants/global.constants.js",
          pattern: /(\/\/ DEFINE ROLES)/g,
          template: `{
              name: '{{pascalCase title}}',
              key: '{{removeVietnamese title}}',
              subs: [
                {
                  name: 'Thêm mới {{title}}',
                  key: 'them',
                },
                {
                  name: 'Cập nhật {{title}}',
                  key: 'sua',
                },
                {
                  name: 'Xem danh sách {{title}}',
                  key: 'xem',
                },
                {
                  name: 'Xóa {{title}}',
                  key: 'xoa',
                },
              ],
            },
            {
              name: 'Danh mục {{title}}',
              key: 'nhom_{{removeVietnamese title}}',
              subs: [
                {
                  name: 'Thêm mới danh mục',
                  key: 'them',
                },
                {
                  name: 'Cập nhật danh mục',
                  key: 'sua',
                },
                {
                  name: 'Xem danh sách danh mục',
                  key: 'xem',
                },
                {
                  name: 'Xóa danh mục',
                  key: 'xoa',
                },
              ],
            },`,
        },
        {
          type: "append",
          path: "client/src/routers.js",
          pattern: /(\/\/ IMPORT PAGE MODULE)/g,
          template: `const {{pascalCase name}} = React.lazy(()=>import('containers/{{lowerCase name}}/{{pascalCase name}}'));
          const {{pascalCase name}}Form = React.lazy(()=>import('containers/{{lowerCase name}}/{{pascalCase name}}Form'));
          const {{pascalCase name}}Category = React.lazy(()=>import('containers/{{lowerCase name}}/{{pascalCase name}}Category'));`
        },
        {
          type: "append",
          path: "client/src/routers.js",
          pattern: /(\/\/ RENDER PAGE MODULE)/g,
          template: `{
              name: getLangText('MENU.{{upperCase name}}S'),
              icon: <FormOutlined />,
              hidden: !shouldHaveAccessPermission('{{removeVietnamese title}}'),
              id: '{{lowerCase name}}s',
              sub: [
                {
                  path: '/{{lowerCase name}}s',
                  name: getLangText('MENU.ALL_{{upperCase name}}S'),
                  exact: true,
                  icon: <OrderedListOutlined />,
                  parent: '{{lowerCase name}}s',
                  hidden: !shouldHaveAccessPermission('{{removeVietnamese title}}', '{{removeVietnamese title}}/xem'),
                  render: props =>
                    shouldHaveAccessPermission('{{removeVietnamese title}}', '{{removeVietnamese title}}/xem') ? (
                      <{{pascalCase name}} {...props} />
                    ) : (
                      <Redirect to="/protected" />
                    ),
                },
                {
                  path: '/{{lowerCase name}}/add',
                  name: getLangText('MENU.ADD_NEW_{{upperCase name}}'),
                  exact: true,
                  parent: '{{lowerCase name}}s',
                  hidden: !shouldHaveAccessPermission('{{removeVietnamese title}}', '{{removeVietnamese title}}/them'),
                  render: props =>
                    shouldHaveAccessPermission('{{removeVietnamese title}}', '{{removeVietnamese title}}/them') ? (
                      <{{pascalCase name}}Form {...props} />
                    ) : (
                      <Redirect to="/protected" />
                    ),
                },
                {
                  path: '/{{lowerCase name}}/edit/:id',
                  name: getLangText('MENU.EDIT_{{upperCase name}}'),
                  hidden: true,
                  parent: '{{lowerCase name}}s',
                  exact: false,
                  render: props =>
                    shouldHaveAccessPermission('{{removeVietnamese title}}', '{{removeVietnamese title}}/sua') ? (
                      <{{pascalCase name}}Form {...props} />
                    ) : (
                      <Redirect to="/protected" />
                    ),
                },
                {
                  path: '/{{lowerCase name}}_category',
                  name: getLangText('MENU.{{upperCase name}}_CATEGORIES'),
                  exact: true,
                  icon: <FolderOutlined />,
                  hidden: !shouldHaveAccessPermission('{{removeVietnamese title}}'),
                  parent: '{{lowerCase name}}s',
                  render: props =>
                    shouldHaveAccessPermission('{{removeVietnamese title}}') ? (
                      <{{pascalCase name}}Category {...props} />
                    ) : (
                      <Redirect to="/protected" />
                    ),
                },
              ],
            },`
        },

       /*  {
          type: "append",
          path: "client/src/constants/languages/en.js",
          pattern: /(\/\/ MODULE ITEMS EN)/g,
          template: `{{upperCase name}}: {
                {{upperCase name}}S: '{{pascalCase name}}s',
                {{upperCase name}}S_MANAGERMENTS: '{{pascalCase name}}s managerments',
                ADD_NEW_{{upperCase name}}: 'Add new {{lowerCase name}}',
                EDIT_{{upperCase name}}: 'Edit {{lowerCase name}}',
                LIST_{{upperCase name}}S: 'List {{lowerCase name}}s',
                ADD_NEW_CATEGORY: 'Add new category',
                {{upperCase name}}S_CATEGORIES: '{{pascalCase name}} categories',
                DELETE_CONFIRM: 'Are you sure delete this {{lowerCase name}}?',
              },`,
        },
        {
          type: "append",
          path: "client/src/constants/languages/vi.js",
          pattern: /(\/\/ MODULE ITEMS VI)/g,
          template: `{{upperCase name}}: {
                {{upperCase name}}S: '{{pascalCase title}}',
                {{upperCase name}}S_MANAGERMENTS: 'Quản lý {{title}}',
                ADD_NEW_{{upperCase name}}: 'Thêm mới {{title}}',
                EDIT_{{upperCase name}}: 'Cập nhật {{title}}',
                LIST_{{upperCase name}}S: 'Danh sách {{title}}',
                ADD_NEW_CATEGORY: 'Thêm mới danh mục',
                {{upperCase name}}S_CATEGORIES: 'Danh mục {{title}}',
                DELETE_CONFIRM: 'Bạn có chắc chắn muốn xóa không?',
              },`,
        },
        {
          type: "append",
          path: "client/src/constants/languages/en.js",
          pattern: /(\/\/ MENU ITEMS EN)/g,
          template: `{{upperCase name}}S: '{{pascalCase name}}s',
              ALL_{{upperCase name}}S: 'All {{lowerCase name}}s',
              ADD_NEW_{{upperCase name}}: 'Add new',
              EDIT_{{upperCase name}}: 'Edit',
              {{upperCase name}}_CATEGORIES: 'Categories',
            `,
        },
        {
          type: "append",
          path: "client/src/constants/languages/vi.js",
          pattern: /(\/\/ MENU ITEMS VI)/g,
          template: `{{upperCase name}}S: '{{pascalCase title}}',
              ALL_{{upperCase name}}S: 'Danh sách',
              ADD_NEW_{{upperCase name}}: 'Thêm mới',
              EDIT_{{upperCase name}}: 'Sửa',
              {{upperCase name}}_CATEGORIES: 'Danh mục',
            `,
        }, */

      ];
    },
  });
};