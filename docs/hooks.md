## Embedded hooks

In addition to our [React Integration](../react-integration), Cozy Client comes with several hooks.

- [useAppLinkWithStoreFallback](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hooks/useAppLinkWithStoreFallback.jsx): Returns the URL of an app if this app is installed. If not, returns the URL to the store to install it.
- [useCapabilities](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hooks/useCapabilities.jsx): Returns the [capabilities](https://docs.cozy.io/en/cozy-stack/settings/#get-settingscapabilities) for an instance
- [useFetchShortcut](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hooks/useFetchShortcut.jsx): Returns the data for a shortcut
- [useClient](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hooks/useClient.js): Returns client of actual context
- [useFetchJSON](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hooks/useFetchJSON.js): Hook to use the generic fetchJSON method. Returns object with the same keys { data, fetchStatus, error } as useQuery
- [useQuery](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hooks/useQuery.js): Returns the queryState after fetching a queryDefinition
- [useSettings](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hooks/useSetting.js): Query the cozy-app settings corresponding to the given slug

### Accessing and Mutating cozy-app settings with `useSettings`

Sometimes cozy-apps need to access settings related data

Those settings can be specific to the cozy-app, or global to the Cozy's instance

In order to ease manipulating those settings we provide the hook `useSettings`

This hook is based on `useQuery` and `useMutation` to provide the setting's `values`
and a `save` method that allow to mutate the settings

Additionally, the `query` and `mutation` object are provided in order to react to
their corresponding states (fetch status, mutation status, etc)

```jsx
import { hasQueryBeenLoaded, useSettings } from 'cozy-client'

function DefaultRedirectionSetting() {
  const [inputValue, setInputValue] = useState('')

  const { values, save, query, mutation } = useSettings(
    'instance', // slug for acessing the global settings
    ['default_redirection'], // setting names
  )

  const handleChange = event => {
    setInputValue(event.target.value)
  }

  const handleBlur = () => {
    save({
      default_redirection: inputValue
    })
  }

  useEffect(() => {
    setInputValue(values.default_redirection)
  }, [values])

  return (
    <div style={{ display: 'flex' }}>
      <input
        type="text"
        aria-label="Setting"
        style={{ marginRight: '1rem' }}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={!hasQueryBeenLoaded(query)}
      />
      {mutation.mutationStatus === 'loaded' ? '✓' : null}
      {mutation.mutationStatus === 'failed' ? '✗' : null}
    </div>
  )
}
```
