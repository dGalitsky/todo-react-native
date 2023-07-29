import { Text, TouchableOpacity } from "react-native"
import React from "react"

export enum EFilter {
  All = "all",
  Active = "active",
  Completed = "completed",
}

interface IFilterProps {
  filter: EFilter
  onChange: (filter: EFilter) => void
}

export const Filter = ({ filter, onChange }: IFilterProps) => {
  const onPress = () => {
    switch (filter) {
      case EFilter.All:
        onChange(EFilter.Active)
        break
      case EFilter.Active:
        onChange(EFilter.Completed)
        break
      case EFilter.Completed:
        onChange(EFilter.All)
        break
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Filter: {filter}</Text>
    </TouchableOpacity>
  )
}
