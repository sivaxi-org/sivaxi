import { Component, input, output } from '@angular/core';
import { Project } from '../../../core/services/project.service';
import { Chat } from '../../../core/services/chat';
import { LogoIcon } from '../logo-icon/logo-icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LogoIcon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  sidebarOpen = input(true);

  projects = input<Project[]>([]);
  selectedProject = input<Project | null>(null);
  expandedProjects = input<Set<string>>(new Set());
  projectChats = input<Record<string, Chat[]>>({});
  loadingProjects = input(false);
  loadingProjectChats = input<Set<string>>(new Set());
  creatingProject = input(false);

  normalChats = input<Chat[]>([]);
  loadingNormalChats = input(false);

  selectedChat = input<Chat | null>(null);

  toggleSidebarEvent = output<void>();
  startGeneralChatEvent = output<void>();
  createProjectEvent = output<void>();
  toggleProjectEvent = output<Project>();
  startProjectChatEvent = output<Project>();
  selectChatEvent = output<{ chat: Chat; project: Project }>();
  deleteChatEvent = output<{ chat: Chat; project: Project }>();
  selectNormalChatEvent = output<Chat>();
  deleteNormalChatEvent = output<Chat>();
  logoutEvent = output<void>();

  isProjectExpanded(projectId: string): boolean {
    return this.expandedProjects().has(projectId);
  }

  isLoadingProjectChats(projectId: string): boolean {
    return this.loadingProjectChats().has(projectId);
  }

  getProjectChats(projectId: string): Chat[] {
    return this.projectChats()[projectId] ?? [];
  }
}