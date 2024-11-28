export const environment = {
    title: 'Hotel la Sierra',
    apiURL : 'http://localhost:8080/api',
    menu: [
        {
            label: 'Inicio',
            visible: true,
            icon: 'pi pi-home',
            routerLink: 'home',
            id: '6ebb094e-cdd7-42cb-858b-sdfdsfsdfd334'
        },

        {
            label: 'Administración',
            visible: true,
            icon: 'pi pi-folder',
            id: '6ebb094e-cdd7-42cb-858b-a8365d148076',
            items: [
                {
                    label: 'Usuarios',
                    icon: 'pi pi-users',
                    routerLink: 'administration/user',
                    items: [],
                    disabled: false,
                    id: '0beafacd-0844-4c43-8721-aa0d7698e08b'
                },
                {
                    label: 'Clientes',
                    icon: 'pi pi-briefcase',
                    routerLink: '/administracion/companies',
                    items: [],
                    disabled: false,
                    id: 'e121e637-484f-4785-8180-1e6a249ff265'
                },
                {
                    label: 'Habitaciones',
                    icon: 'pi pi-check',
                    routerLink: '/administracion/companies',
                    items: [],
                    disabled: false,
                    id: 'e121e637-484f-4785-8180-1e6a249ff265qaaa'
                },
                {
                    label: 'Ventas',
                    icon: 'pi pi-shopping-cart',
                    routerLink: '/administracion/companies',
                    items: [],
                    disabled: false,
                    id: 'e121e637-484f-4785-8180-1e6a249ff265qaaa'
                },
            ],
        },
        {
            label: 'Gestión',
            visible: true,
            icon: 'pi pi-database',
            id: '9f379a06-b690-485c-aa29-96f97759e2a3',
            items: [
                {
                    label: 'Reservas',
                    icon: 'pi pi-clock',
                    routerLink: '/home/information/home',
                    disabled: false,
                    id: '8549722e-b38c-4d09-bd89-d99907829cba'
                },
                {
                    label: 'Recepción',
                    icon: 'pi pi-wrench',
                    routerLink: '/home/information/operation',
                    disabled: false,
                    id: '9ce5a41f-37b0-4ac2-b9fd-52deb4a834d2',
                },
                {
                    label: 'Punto de Ventas',
                    icon: 'pi pi-book',
                    routerLink: '/home/information/systems',
                    disabled: false,
                    id: '150e24d4-c7d8-4e74-945e-a3656be9ca36'
                },
                {
                    label: 'Verficación de Salidas',
                    icon: 'pi pi-building',
                    routerLink: '/home/information/exit-verification',
                    disabled: false,
                    id: 'cd4c0af6-ffca-422f-be74-6aed93fcafa7'
                },
            ],
        },

        {
            label: 'Configuración',
            visible: true,
            icon: 'pi pi-wrench',
            routerLink: '/home/help',
            id: '58b7c841-7fd6-47b9-bd8c-a81ac1fcb211',
        },
    ],

    user: [
        {
            label: 'Perfil',
            visible: true,
            icon: 'pi pi-address-book',
            routerLink: '/administracion',
            id: '6ebb094e-cdd7-42cb-858b-a8365d148076',


        },
        {
            label: 'Cerrar sesión',
            visible: true,
            icon: 'pi pi-sign-out',
            routerLink: '/administracion',
            id: '6ebb094e-cdd7-42cb-858b-a8365d148076',

        }

    ],
    es: {
        firstDayOfWeek: 1,
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        today: 'Hoy',
        clear: 'Limpiar',
    },
    esI18N: {
      "startsWith": "Inicia con",
      "contains": "Contiene",
      "notContains": "No contiene",
      "endsWith": "Termina con",
      "equals": "Igual",
      "notEquals": "No igual",
      "noFilter": "Sin Filtro",
      "lt": "Menor que",
      "lte": "Menor que o igual a",
      "gt": "Mayor que",
      "gte": "Mayor que o igual a",
      "is": "Es",
      "isNot": "No es",
      "before": "Antes",
      "after": "Despúes",
      "dateIs": "La Fecha es",
      "dateIsNot": "La Fecha no es",
      "dateBefore": "La Fecha es anterior",
      "dateAfter": "La fecha es posterior",
      "clear": "Limpiar",
      "apply": "Aplicar",
      "matchAll": "Coincidir con todo",
      "matchAny": "Coincidir con cualquiera",
      "addRule": "Agregar regla",
      "removeRule": "Eliminar regla",
      "accept": "Si",
      "reject": "No",
      "choose": "Escoger",
      "upload": "Subir",
      "cancel": "Cancelar",
      "dayNames": ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      "dayNamesShort": ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      "dayNamesMin": ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      "monthNames": ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      "monthNamesShort": ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      "dateFormat": "dd/mm/yy",
      "firstDayOfWeek": 0,
      "today": "Hoy",
      "weekHeader": "Wk",
      "weak": 'Debíl',
      "medium": 'Medio',
      "strong": 'Fuerte',
      "passwordPrompt": 'Ingrese una contraseña',
      "emptyMessage": 'No se han encontrado resultados',
      "emptyFilterMessage": 'No se han encontrado resultados'
    },

}
