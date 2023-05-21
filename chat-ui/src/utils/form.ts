export function getFormData(target: EventTarget) {
  const inputs = Array.from(target as never)
    .filter((element: any) => element?.name) as HTMLInputElement[]

  const form = inputs.reduce<Record<string, { value: string, element: HTMLInputElement }>>((byName, element) => {
    byName[element.name] = { value: element.value, element }

    return byName
  }, {})

  return form
}
