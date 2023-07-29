import React from "react"
import { StyleSheet } from "react-native"
import { spacing } from "../constants/style"
import { ActionButton } from "./ActionButton"

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

  return <ActionButton title={`Filter: ${filter}`} onPress={onPress} style={styles.button} />
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: spacing.m,
    left: spacing.m,
    zIndex: 1,
  },
})
