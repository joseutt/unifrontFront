import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  Award,
  GraduationCap,
  Library,
  User,
} from "lucide-react";

export const sidebarSections = [
  {
    title: "General",

    items: [
      {
        icon: LayoutDashboard,
        label: "Panel",
        path: "/dashboard",
        roles: ["ADMIN", "DOCENTE", "CONTROL_ESCOLAR"],
      },
    ],
  },

  {
    title: "Académico",

    items: [
      {
        icon: GraduationCap,
        label: "Carreras",
        path: "/carreras",
        roles: ["ADMIN"],
      },

      {
        icon: Library,
        label: "Materias",
        path: "/materias",
        roles: ["ADMIN"],
      },

      {
        icon: BookOpen,
        label: "Planes de estudio",
        path: "/planes-estudio",
        roles: ["ADMIN", "DOCENTE"],
      },
    ],
  },

  {
    title: "Escolar",

    items: [
      {
        icon: Users,
        label: "Alumnos",
        path: "/alumnos",
        roles: ["ADMIN"],
      },

      {
        icon: Award,
        label: "Cuadro de honor",
        path: "/cuadro-honor",
        roles: ["ADMIN"],
      },
    ],
  },

  {
    title: "Docentes",

    items: [
      {
        icon: ClipboardList,
        label: "Captura",
        path: "/captura",
        roles: ["DOCENTE"],
      },
    ],
  },

  {
    title: "Administración",

    items: [
      {
        icon: User,
        label: "Usuarios",
        path: "/usuarios",
        roles: ["ADMIN"],
      },
    ],
  },

  {
    title: "Documentos",

    items: [
      {
        icon: Users,
        label: "Constancias de estudio",
        path: "/constancias",
        roles: ["ADMIN", "CONTROL_ESCOLAR"],
      },
    ],
  },
];
