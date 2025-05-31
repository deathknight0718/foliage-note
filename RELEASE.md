# BUG 记录：

## 202505300100

**参考**：[ISSUE](https://github.com/emotion-js/emotion/issues/3308)

**症状**：使用 `next dev --turbopack` 进行测试时，浏览器报错如下：

```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <Head>
    <ThemeProvider theme={{...}}>
      <CssVarsProvider theme={{...}}>
        <ThemeProvider themeId={undefined} theme={{...}}>
          <ThemeProvider theme={{...}}>
            <RtlProvider value={false}>
              <DefaultPropsProvider value={{}}>
                <CssBaseline>
                <Home>
                  <Container maxWidth="sm">
                    <MuiContainer-root as="div" ownerState={{maxWidth:"sm", ...}} className="MuiContain..." ref={null}>
                      <Insertion>
                      <div
+                       className="MuiContainer-root MuiContainer-maxWidthSm mui-1me0hdw-MuiContainer-root"
-                       className="MuiContainer-root MuiContainer-maxWidthSm css-1me0hdw-MuiContainer-root"
                      >
                        <Box sx={{my:4}}>
                          <Styled(div) as="div" ref={null} className="MuiBox-root" theme={{...}} sx={{my:4}}>
                            <Insertion>
                            <div
+                             className="MuiBox-root mui-yv5sv0"
-                             className="MuiBox-root css-yv5sv0"
                            >
                              <Typography variant="h4" component="h1" sx={{mb:2}}>
                                <MuiTypography-root as="h1" ref={null} className="MuiTypogra..." sx={{...}} ...>
                                  <Insertion>
                                  <h1
+                                   className="MuiTypography-root MuiTypography-h4 mui-cwd0uz-MuiTypography-root"
-                                   className="MuiTypography-root MuiTypography-h4 css-cwd0uz-MuiTypography-root"
                                    style={{}}
                                  >
+                                   Material UI - Next.js example
                              <Button variant="contained">
                                <MuiButton-root ownerState={{variant:"c...", ...}} className="MuiButton-..." ...>
                                  <Insertion>
                                  <ButtonBase className="MuiButton-..." component="button" disabled={null} ...>
                                    <MuiButtonBase-root as="button" className="MuiButtonB..." ownerState={{...}} ...>
                                      <Insertion>
                                      <button
+                                       className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-con..."
-                                       className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-con..."
                                        onBlur={function useEventCallback.useRef}
                                        onClick={undefined}
                                        onContextMenu={function useEventCallback.useRef}
                                        onFocus={function useEventCallback.useRef}
                                        onKeyDown={function useEventCallback.useRef}
                                        onKeyUp={function useEventCallback.useRef}
                                        onMouseDown={function useEventCallback.useRef}
                                        onMouseLeave={function useEventCallback.useRef}
                                        onMouseUp={function useEventCallback.useRef}
                                        onDragLeave={function useEventCallback.useRef}
                                        onTouchEnd={function useEventCallback.useRef}
                                        onTouchMove={function useEventCallback.useRef}
                                        onTouchStart={function useEventCallback.useRef}
                                        tabIndex={0}
                                        type="button"
                                        disabled={null}
                                        id={undefined}
                                        ref={function useForkRef.useMemo}
                                      >
        ...
```

**方案**：改变 `package.json` 的调试方式，去掉 `--turbopack`，这就是一个纯傻逼开发的问题。