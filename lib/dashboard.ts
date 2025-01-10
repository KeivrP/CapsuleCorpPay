import { MaterialCommunityIcons } from '@expo/vector-icons';

export const recommendedDishes = [
    {
        id: 1,
        name: 'Risotto de Trufa', // name translated to 'name' (name)
        price: 28.99,
        description: 'Arroz Arborio cremoso con trufa negra y parmesano',
        image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=2070?auto=format&fit=crop&q=80&w=400',
        tags: ['Especial del Chef', 'Vegetariano'], // tags translated to 'tags' (tags)
        allergens: ['Lácteos'], // allergens translated to 'allergens' (allergens)
    },
    {
        id: 2,
        name: 'Pulpo a la Plancha',
        price: 32.99,
        description: 'Estilo mediterráneo con aceite de oliva y hierbas',
        image: 'https://images.unsplash.com/photo-1526243070121-8040f7c9cc1c?q=80&w=1932?auto=format&fit=crop&q=80&w=400',
        tags: ['Tendencia', 'Mariscos'],
        allergens: ['Mariscos'],
    },
    {
        id: 3,
        name: 'Hamburguesa de Carne Wagyu',
        price: 26.99,
        description: 'Carne de res premium con cebollas caramelizadas y alioli de trufa',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
        tags: ['Más Popular', 'Especialidad'],
        allergens: ['Gluten', 'Lácteos', 'Huevos'],
    },
];

export const orders = [
    { id: 1, table: 5, status: 'En preparacion', items: ['Pasta Carbonara', 'Caesar Salad'], time: '10:30' },
    { id: 2, table: 3, status: 'Lista', items: ['Grilled Salmon', 'Wine'], time: '10:35' },
    { id: 3, table: 8, status: 'Nueva orden', items: ['Pizza Margherita', 'Tiramisu'], time: '10:40' },
];

export const stats = [
    {
        id: '1',
        title: 'Ventas Totales',
        value: '$23,000',
        change: '+2.5%',
        icon: 'currency-usd' as keyof typeof MaterialCommunityIcons.glyphMap
    },
    { id: 2, title: 'Total Pedidos', value: '156', change: '+8.2%', icon: 'trending-up' as keyof typeof MaterialCommunityIcons.glyphMap },
    { id: 3, title: 'Pedido Promedio', value: '$31.34', change: '+5.1%', icon: 'chart-bar' as keyof typeof MaterialCommunityIcons.glyphMap },
    { id: 4, title: 'Mesas Activas', value: '24', change: '+3.7%', icon: 'account-group'as keyof typeof MaterialCommunityIcons.glyphMap },
];

export const personal = [
    {
      nombre: 'Juan Pérez',
      mesas: 12,
      tiempoPromedio: '15min',
      ventas: 1250,
      calificacion: 4.8,
      estado: 'activo' as const
    },
    {
      nombre: 'María García',
      mesas: 15,
      tiempoPromedio: '12min',
      ventas: 1480,
      calificacion: 4.9,
      estado: 'activo' as const
    },
    {
      nombre: 'Miguel Rodríguez',
      mesas: 10,
      tiempoPromedio: '18min',
      ventas: 980,
      calificacion: 4.7,
      estado: 'descanso' as const
    },
  ];

  export const datosVentas = [
    { value: 2400, label: 'Lun' },
    { value: 1398, label: 'Mar' },
    { value: 3800, label: 'Mié' },
    { value: 3908, label: 'Jue' },
    { value: 4800, label: 'Vie' },
    { value: 3800, label: 'Sáb' },
    { value: 4300, label: 'Dom' },
  ];
  
  