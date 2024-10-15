"use server";


export async function createProject(
    formData: FormData,
){
    const {name, latitude, length} = Object.fromEntries(formData)
    
}