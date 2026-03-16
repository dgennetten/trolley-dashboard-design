import data from '@/../product/sections/content-management/data.json'
import type {
  HeroConfig,
  EventItem,
  PageContent,
} from '@/../product/sections/content-management/types'
import { ContentManagement } from './components/ContentManagement'

export default function ContentManagementPreview() {
  return (
    <ContentManagement
      heroConfig={data.heroConfig as HeroConfig}
      events={data.events as EventItem[]}
      pages={data.pages as unknown as PageContent[]}
      onSaveHeroDraft={(config) => console.log('Save hero draft:', config)}
      onPublishHero={(config) => console.log('Publish hero:', config)}
      onAddHeroImage={(image) => console.log('Add hero image:', image)}
      onRemoveHeroImage={(id) => console.log('Remove hero image:', id)}
      onReorderHeroImages={(ids) => console.log('Reorder hero images:', ids)}
      onCreateEvent={(event) => console.log('Create event:', event)}
      onUpdateEvent={(id, updates) => console.log('Update event:', id, updates)}
      onDeleteEvent={(id) => console.log('Delete event:', id)}
      onPublishEvent={(id) => console.log('Publish event:', id)}
      onUnpublishEvent={(id) => console.log('Unpublish event:', id)}
      onSavePageDraft={(id, blocks) => console.log('Save page draft:', id, blocks)}
      onPublishPage={(id, blocks) => console.log('Publish page:', id, blocks)}
      onUnpublishPage={(id) => console.log('Unpublish page:', id)}
    />
  )
}
