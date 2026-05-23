import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  CalendarCheck,
  Award,
  GraduationCap,
  Library,
  User,
  FileStack,
  FileSpreadsheet,
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
        label: "Cargas academicas",
        path: "/alumnos",
        roles: ["ADMIN", "CONTROL_ESCOLAR"],
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
        label: "Calificaciones",
        path: "/captura",
        roles: ["DOCENTE"],
      },
      {
        icon: CalendarCheck,
        label: "Asistencia",
        path: "/asistencia",
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
      {
        icon: FileSpreadsheet,
        label: "Reportes",
        path: "/reportes-fundamentales",
        roles: ["ADMIN", "CONTROL_ESCOLAR"],
      },
    ],
  },

  {
    title: "Documentos",

    items: [
      {
        icon: BookOpen,
        label: "Constancias de estudio",
        path: "/constancia-estudios",
        roles: ["ADMIN", "CONTROL_ESCOLAR"],
      },
      {
        icon: BookOpen,
        label: "Constancias de terminación",
        path: "/constancia-terminacion",
        roles: ["ADMIN", "CONTROL_ESCOLAR"],
      },
      {
        icon: BookOpen,
        label: "Acta de examen extraordinario",
        path: "/acta-examen-extraordinario",
        roles: ["ADMIN", "CONTROL_ESCOLAR"],
      },
      {
        icon: BookOpen,
        label: "Acta de examen titulo suficiencia",
        path: "/acta-examen-titulo-suficiencia",
        roles: ["ADMIN", "CONTROL_ESCOLAR"],
      },
      {
        icon: BookOpen,
        label: "Recibo documentos originales",
        path: "/recibo-documentos-originales",
        roles: ["ADMIN", "CONTROL_ESCOLAR"],
      },
      {
        icon: FileStack,
        label: "Expediente digital",
        path: "/documentos-alumno",
        roles: ["ADMIN", "CONTROL_ESCOLAR"],
      },
    ],
  },
];
