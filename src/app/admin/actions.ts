'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// -- Events --
export async function getEvents() {
  return await prisma.event.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function createEvent(data: any) {
  await prisma.event.create({ data });
  revalidatePath('/admin/events');
  revalidatePath('/');
}

export async function updateEvent(id: number, data: any) {
  await prisma.event.update({ where: { id }, data });
  revalidatePath('/admin/events');
  revalidatePath('/');
}

export async function deleteEvent(id: number) {
  await prisma.event.delete({ where: { id } });
  revalidatePath('/admin/events');
  revalidatePath('/');
}

// -- Spotlight --
export async function getSpotlights() {
  return await prisma.studentSpotlight.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function createSpotlight(data: any) {
  await prisma.studentSpotlight.create({ data });
  revalidatePath('/admin/spotlight');
  revalidatePath('/');
}

export async function deleteSpotlight(id: number) {
  await prisma.studentSpotlight.delete({ where: { id } });
  revalidatePath('/admin/spotlight');
  revalidatePath('/');
}

// -- Executives --
export async function getExecutives() {
  return await prisma.executive.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function createExecutive(data: any) {
  await prisma.executive.create({ data });
  revalidatePath('/admin/executives');
  revalidatePath('/');
}

export async function deleteExecutive(id: number) {
  await prisma.executive.delete({ where: { id } });
  revalidatePath('/admin/executives');
  revalidatePath('/');
}

// -- Mission & Vision --
export async function getMissions() {
  return await prisma.missionVision.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function createMission(data: any) {
  await prisma.missionVision.create({ data });
  revalidatePath('/admin/mission');
  revalidatePath('/');
}

export async function deleteMission(id: number) {
  await prisma.missionVision.delete({ where: { id } });
  revalidatePath('/admin/mission');
  revalidatePath('/');
}

// -- Welfare --
export async function getWelfares() {
  return await prisma.welfareInitiative.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function createWelfare(data: any) {
  await prisma.welfareInitiative.create({ data });
  revalidatePath('/admin/welfare');
  revalidatePath('/');
}

export async function deleteWelfare(id: number) {
  await prisma.welfareInitiative.delete({ where: { id } });
  revalidatePath('/admin/welfare');
  revalidatePath('/');
}
