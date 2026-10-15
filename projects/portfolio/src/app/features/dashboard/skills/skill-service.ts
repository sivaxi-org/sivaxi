
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface SkillCategoryDto {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  sortOrder: number;
  visible: boolean;
}

export interface SkillDto {
  id: string;
  name: string;
  icon: string | null;
  proficiency: number;
  sortOrder: number;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private readonly apiUrl = `${environment.apiUrl}/api/skills`;

  constructor(private readonly http: HttpClient) {}

  // -------------------------
  // Categories
  // -------------------------

  getCategories(visibleOnly = false): Observable<SkillCategoryDto[]> {
    return this.http.get<SkillCategoryDto[]>(
      `${this.apiUrl}/categories?visibleOnly=${visibleOnly}`
    );
  }

  getCategory(categoryId: string): Observable<SkillCategoryDto> {
    return this.http.get<SkillCategoryDto>(
      `${this.apiUrl}/categories/${categoryId}`
    );
  }

  createCategory(category: SkillCategoryDto): Observable<SkillCategoryDto> {
    return this.http.post<SkillCategoryDto>(
      `${this.apiUrl}/categories`,
      category
    );
  }

  updateCategory(
    categoryId: string,
    category: SkillCategoryDto
  ): Observable<SkillCategoryDto> {
    return this.http.put<SkillCategoryDto>(
      `${this.apiUrl}/categories/${categoryId}`,
      category
    );
  }

  deleteCategory(categoryId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/categories/${categoryId}`
    );
  }

  // -------------------------
  // Skills
  // -------------------------

  getSkills(
    categoryId: string,
    visibleOnly = false
  ): Observable<SkillDto[]> {
    return this.http.get<SkillDto[]>(
      `${this.apiUrl}/categories/${categoryId}/items?visibleOnly=${visibleOnly}`
    );
  }

  getSkill(
    categoryId: string,
    skillId: string
  ): Observable<SkillDto> {
    return this.http.get<SkillDto>(
      `${this.apiUrl}/categories/${categoryId}/items/${skillId}`
    );
  }

  createSkill(
    categoryId: string,
    skill: SkillDto
  ): Observable<SkillDto> {
    return this.http.post<SkillDto>(
      `${this.apiUrl}/categories/${categoryId}/items`,
      skill
    );
  }

  updateSkill(
    categoryId: string,
    skillId: string,
    skill: SkillDto
  ): Observable<SkillDto> {
    return this.http.put<SkillDto>(
      `${this.apiUrl}/categories/${categoryId}/items/${skillId}`,
      skill
    );
  }

  deleteSkill(
    categoryId: string,
    skillId: string
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/categories/${categoryId}/items/${skillId}`
    );
  }
}

