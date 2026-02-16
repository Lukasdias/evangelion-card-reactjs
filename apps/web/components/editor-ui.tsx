'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  Plus,
  X,
  GripVertical,
  ZoomIn,
  ZoomOut,
  Pencil,
  Download,
  Type,
  Sparkles,
  LayoutGrid,
  Sun,
} from 'lucide-react'
import type { CardState } from '@vignette-cards/core'

interface CollapsibleSectionProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

export function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className='editor-section'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='editor-section-header'
      >
        <div className='flex items-center gap-2'>
          {icon && <span className='text-theme-primary'>{icon}</span>}
          <span className='text-xs font-semibold uppercase tracking-wider'>
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className='opacity-50'
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className='overflow-hidden'
          >
            <div className='editor-section-content'>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
  presets?: string[]
}

const DEFAULT_COLOR_PRESETS = [
  '#ffffff',
  '#39ff14',
  '#00d4aa',
  '#ffb800',
  '#ff2a2a',
  '#8b5cf6',
  '#06b6d4',
  '#f472b6',
]

export function ColorPicker({
  value,
  onChange,
  presets = DEFAULT_COLOR_PRESETS,
}: ColorPickerProps) {
  const [showCustom, setShowCustom] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='space-y-3'>
      <div className='flex gap-2 flex-wrap'>
        {presets.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`color-swatch ${value === color ? 'active' : ''}`}
            style={{
              backgroundColor: color,
              boxShadow:
                value === color
                  ? `0 0 0 2px var(--chameleon-bg), 0 0 0 4px ${color}, 0 0 20px ${color}40`
                  : 'none',
            }}
            title={color}
          />
        ))}
        <button
          onClick={() => {
            setShowCustom(!showCustom)
            if (!showCustom) {
              setTimeout(() => inputRef.current?.focus(), 100)
            }
          }}
          className={`color-swatch color-swatch-custom ${showCustom ? 'active' : ''}`}
          title='Custom color'
        >
          <Plus size={14} />
        </button>
      </div>
      <AnimatePresence>
        {showCustom && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className='overflow-hidden'
          >
            <div className='flex gap-2'>
              <div className='relative'>
                <input
                  type='color'
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className='absolute inset-0 opacity-0 cursor-pointer'
                />
                <div
                  className='w-10 h-10 rounded-xl border border-white/10'
                  style={{ backgroundColor: value }}
                />
              </div>
              <input
                ref={inputRef}
                type='text'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className='chameleon-input flex-1 font-mono text-sm'
                placeholder='#39ff14'
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface VisualSliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange: (value: number) => void
  showValue?: boolean
}

export function VisualSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
  showValue = true,
}: VisualSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className='space-y-2'>
      <div className='flex justify-between items-center'>
        <label className='text-xs text-white/50'>{label}</label>
        {showValue && (
          <span className='text-xs font-mono text-theme-primary'>
            {value}
            {unit}
          </span>
        )}
      </div>
      <div className='slider-container'>
        <div
          className='slider-fill'
          style={{ width: `${percentage}%` }}
        />
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className='slider-input'
        />
      </div>
    </div>
  )
}

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string; icon?: React.ReactNode }[]
  value: T
  onChange: (value: T) => void
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className='segmented-control'>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`segmented-control-item ${
            value === option.value ? 'active' : ''
          }`}
        >
          {option.icon && <span className='mr-1.5'>{option.icon}</span>}
          {option.label}
        </button>
      ))}
    </div>
  )
}

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
}

export function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <label className='toggle-wrapper'>
      <div className='flex-1 cursor-pointer'>
        {label && (
          <div className='text-sm font-medium text-white/90'>{label}</div>
        )}
        {description && (
          <div className='text-xs text-white/40 mt-0.5'>{description}</div>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`toggle-switch ${checked ? 'active' : ''}`}
        role='switch'
        aria-checked={checked}
      >
        <motion.div
          className='toggle-thumb'
          layout
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      </button>
    </label>
  )
}

interface PresetCardProps {
  title: string
  subtitle?: string
  headerLines: string[]
  onClick: () => void
  isActive?: boolean
}

export function PresetCard({
  title,
  subtitle,
  headerLines,
  onClick,
  isActive,
}: PresetCardProps) {
  return (
    <button
      onClick={onClick}
      className={`preset-card ${isActive ? 'active' : ''}`}
    >
      <div className='preset-card-preview'>
        <div className='preset-card-lines'>
          {headerLines.slice(0, 3).map((line, i) => (
            <div
              key={i}
              className='preset-card-line'
              style={{ width: `${Math.max(30, 100 - i * 20)}%` }}
            />
          ))}
        </div>
      </div>
      <div className='preset-card-info'>
        <div className='preset-card-title'>{title}</div>
        {subtitle && (
          <div className='preset-card-subtitle'>{subtitle}</div>
        )}
      </div>
      {isActive && (
        <motion.div
          layoutId='activePreset'
          className='preset-card-indicator'
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  )
}

interface PropertyPanelProps {
  children: React.ReactNode
  title?: string
  onClose?: () => void
}

export function PropertyPanel({
  children,
  title = 'Properties',
  onClose,
}: PropertyPanelProps) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className='property-panel'
    >
      <div className='property-panel-header'>
        <h3 className='property-panel-title'>{title}</h3>
        {onClose && (
          <button onClick={onClose} className='property-panel-close'>
            <X size={18} />
          </button>
        )}
      </div>
      <div className='property-panel-content'>{children}</div>
    </motion.div>
  )
}

interface ToolbarButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  isActive?: boolean
  shortcut?: string
}

export function ToolbarButton({
  icon,
  label,
  onClick,
  isActive,
  shortcut,
}: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`toolbar-button ${isActive ? 'active' : ''}`}
      title={`${label}${shortcut ? ` (${shortcut})` : ''}`}
    >
      <span className='toolbar-button-icon'>{icon}</span>
      <span className='toolbar-button-label'>{label}</span>
    </button>
  )
}

interface QuickActionsBarProps {
  actions: {
    icon: React.ReactNode
    label: string
    onClick: () => void
    isActive?: boolean
  }[]
}

export function QuickActionsBar({ actions }: QuickActionsBarProps) {
  return (
    <div className='quick-actions-bar'>
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className={`quick-action-button ${action.isActive ? 'active' : ''}`}
          title={action.label}
        >
          {action.icon}
        </button>
      ))}
    </div>
  )
}

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  icon?: React.ReactNode
  label?: string
}

export function TextInput({
  value,
  onChange,
  placeholder,
  icon,
  label,
}: TextInputProps) {
  return (
    <div className='space-y-1.5'>
      {label && <label className='input-label'>{label}</label>}
      <div className='input-wrapper'>
        {icon && <span className='input-icon'>{icon}</span>}
        <input
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`chameleon-input ${icon ? 'with-icon' : ''}`}
        />
      </div>
    </div>
  )
}

interface AddLineButtonProps {
  onClick: () => void
  disabled?: boolean
}

export function AddLineButton({ onClick, disabled }: AddLineButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className='add-line-button'>
      <Plus size={16} />
      <span>Add Line</span>
    </button>
  )
}

interface RemoveLineButtonProps {
  onClick: () => void
}

export function RemoveLineButton({ onClick }: RemoveLineButtonProps) {
  return (
    <button onClick={onClick} className='remove-line-button' title='Remove line'>
      <X size={14} />
    </button>
  )
}

interface DraggableLineItemProps {
  index: number
  value: string
  onChange: (value: string) => void
  onRemove: () => void
  canRemove: boolean
  isDragging?: boolean
  dragHandleProps?: any
}

export function DraggableLineItem({
  index,
  value,
  onChange,
  onRemove,
  canRemove,
}: DraggableLineItemProps) {
  return (
    <div className='draggable-line-item'>
      <div className='draggable-line-handle'>
        <GripVertical size={12} />
      </div>
      <div className='draggable-line-number'>{index + 1}</div>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Line ${index + 1}`}
        className='draggable-line-input'
      />
      {canRemove && (
        <RemoveLineButton onClick={onRemove} />
      )}
    </div>
  )
}

interface ZoomControlProps {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
}

export function ZoomControl({ zoom, onZoomIn, onZoomOut, onReset }: ZoomControlProps) {
  return (
    <div className='zoom-control'>
      <button onClick={onZoomOut} className='zoom-button' title='Zoom out'>
        <ZoomOut size={16} />
      </button>
      <button onClick={onReset} className='zoom-value' title='Reset zoom'>
        {Math.round(zoom * 100)}%
      </button>
      <button onClick={onZoomIn} className='zoom-button' title='Zoom in'>
        <ZoomIn size={16} />
      </button>
    </div>
  )
}

export { Pencil, Download, Type, Sparkles, LayoutGrid, Sun }
