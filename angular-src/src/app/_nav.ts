
export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',

    }
  },
  
  {
    title: true,
    name: 'admin'
  },
  {
    name: 'Admin',
    url:'/add-admin',
    icon: 'icon-user',
    children:[
      {
        name: 'Add Admin',
        url: '/add-admin',
        icon: 'icon-pencil'
      },

    ]
  },
 
  

  {
    name:  'Super Admin',
    url:'/shopowner',
    icon: 'icon-user',
    children:[
  {
    name: 'Shopowner',
    url: '/shopowner',
    icon: 'icon-cursor'
  },
   {
    name: 'Saleperson',
    url: '/salesperson',
    icon: 'icon-cursor'
  },
  {
    name: 'Shopmanager',
    url: '/shopmanager',
    icon: 'icon-cursor'
  },
  {
    name: 'Expense',
    url: '/expense',
    icon: 'icon-cursor'
  },
  {
    name: 'Service',
    url: '/service',
    icon: 'icon-cursor'
  },
  {
    name: 'Salereturn',
    url: '/salereturn',
    icon: 'icon-cursor'
  },
  {
    name: 'Purchasereturn',
    url: '/purchasereturn',
    icon: 'icon-cursor'
  },

  
]
  },
  { 
    name:  'Customer Details',
    url:'/addorder',
    icon: 'icon-user',
    children:[ {
      name: 'Customer',
      url: '/customer',
      icon: 'icon-cursor'
    },
   
  ]
  },

 
  {
    name:  'Branch',
    url:'/add-Branch',
    icon: 'icon-user',
    children:[
  {
    name: 'Add Branch',
    url: '/curriculum',
    icon: 'icon-cursor'
    
  },
 
]
  },
  {
    name:  'Master Model',
    url:'/add-Product Added',
    icon: 'icon-basket',
    children:[
  {
    name: 'Category',
    url: '/category',
    icon: 'icon-cursor'
  },
  {
    name: 'Brand',
    url: '/brand',
    icon: 'icon-cursor'
  },
 
  {
    name: ' Model',
    url: '/modelpd',
    icon: 'icon-cursor'
  },
  
 
 
  {
    name: 'Manfacturer',
    url: '/manufacturer',
    icon: 'icon-cursor'
  },
  {
    name: 'Colour',
    url: '/colour',
    icon: 'icon-cursor'
  },

  {
    name: ' Product ',
    url: '/product',
    icon: 'icon-cursor'
  },

  {
    name: ' GST ',
    url: '/gst',
    icon: 'icon-cursor'
  },
]
  },
{ 
  name:  'Biiling',
  url:'/addorder',
  icon: 'icon-user',
  children:[ {
    name: 'Billing',
    url: '/addorder',
    icon: 'icon-cursor'
  },
 
]
},
{ 
  name:  'Reports',
  url:'/reports',
  icon: 'icon-user',
//   children:[
//     {
//       name: 'Reports',
//       url: '/reports',
//       icon: 'icon-cursor'
//     },
// ]
},


{ 
  name:  'Stock Manager',
  url:'/stock',
  icon: 'icon-user',
  children:[ {
    name: 'Add Stock',
    url: '/stock',
    icon: 'icon-cursor'
  },
 
]
},




  // {
  //   title: true,
  //   name: 'Manage Questions'
  // },
  // {
  //   name: 'Question',
  //   url: '/question',
  //   icon: 'icon-book-open'
  // },
  // {
  //   name: 'Display Paper',
  //   url: '/question-paper/display-qus-paper',
  //   icon: 'icon-book-open'
  // },
  // {
  //   name: 'Question Paper',
  //   url: '/question-paper/question-paper',
  //   icon: 'icon-book-open'
  // },
  // {
  //   name: 'Create Exam ',
  //   url: '/question-paper/select-quspaper',
  //   icon: 'icon-book-open'
  // },
  // {
  //   title: true,
  //   name: 'Voucher'
  // },
  // {
  //   name: 'Upload Voucher',
  //   url: '/voucher',
  //   icon: 'icon-drop'
  // },
  // {
  //   title: true,
  //   name: 'Forum'
  // },
  // {
  //   name: 'Student Forum',
  //   url: '/forum/student-forum',
  //   icon: 'icon-people'
  // },
  // {
  //   name: 'Faculty Forum',
  //   url: '/forum/faculty-forum',
  //   icon: 'icon-people'
  // },
  // {
  //   name: 'External Forum',
  //   url: '/forum/external-forum',
  //   icon: 'icon-people'
  // },
  // {
  //   title: true,
  //   name: 'Others'
  // },
  // {
  //   name: 'Change Password',
  //   url: '/change-password',
  //   icon: 'icon-star'
  // },
  // {
  //   name: 'Security Question',
  //   url: '/security-question',
  //   icon: 'icon-star'
  // }




];
