declare module 'jquery-tagcanvas/tagcanvas.js';

declare namespace TagCanvas {
    function Start(canvasId: string, tagListId: string, options: TagCanvasOptions): void;
    function Pause(canvasId: string): void;
    function Resume(canvasId: string): void;
    function Reload(canvasId: string): void;
    function Update(canvasId: string): void;
    function TagToFront(canvasId: string, options: TagToFrontOptions): void;
    function SetSpeed(canvasId: string, speed: number[]): void;
    function RotateTag(canvasId: string, options: RotateTagOptions): void;
    function Delete(canvasId: string): void;
}

declare type TagCanvasAlign = 'centre' | 'left' | 'right';

declare type TagCanvasVAlign = 'middle' | 'top' | 'bottom';

declare interface TagToFrontOptions {
    id?: any;
    index?: number;
    text?: string;
    time?: number;
    active?: boolean;
    callback?(...args: any): any;
}

declare interface RotateTagOptions {
    id?: any;
    index?: number;
    text?: string;
    time?: number;
    active?: boolean;
    lat?: number;
    lng?: number;
    callback?(...args: any): any;
}

declare interface TagCanvasOptions {
    /**
     * The CSS cursor type to use when the mouse is over a tag.
     */
    activeCursor?: 'pointer' | 'auto' | 'crosshair' | 'default' | 'move' | 'text' | 'wait' | 'progress' | 'help';

    /**
     * The animation timing function for use with the RotateTag and TagToFront functions. The values available are "Smooth" and "Linear".
     */
    animTiming?: 'Smooth' | 'Linear';
    /**
     * Background colour of tag, null for no background. The string "tag" means use the original link background colour.
     */
    bgColour?: string;

    /**
     * Colour of tag background outline. Use null for the same as the text colour, use "tag" for the original link text colour.
     */
    bgOutline?: string;

    /**
     * Thickness of tag background outline in pixels, 0 for no outline.
     */
    bgOutlineThickness?: number;

    /**
     * Radius for rounded corners of background in pixels.
     */
    bgRadius?: number;

    /**
     * Function for drawing in centre of cloud. The function is passed in these parameters in order: canvas 2D context; canvas width; canvas height; centre X; centre Y. See the centre callback function page for details.
     */
    centreFunc?: (
        context2D: CanvasRenderingContext2D, width: number,
        height: number,
        centreX: number,
        centreY: number) => void;

    /**
     * Image to draw at centre of cloud. Uses a built-in centreFunc callback function to draw the image at full size in the middle of the canvas.
     */
    centreImage?: any;

    /**
     * If set to a number, the selected tag will move to the front in this many milliseconds before activating.
     */
    clickToFront?: number;

    /**
     * Deceleration rate when mouse leaves canvas.
     */
    decel?: number;

    /**
     * Controls the perspective (0.0-1.0)
     */
    depth?: number;

    /**
     * When enabled, cloud moves when dragged instead of based on mouse position.
     */
    dragControl?: boolean;

    /**
     * The number of pixels that the cursor must move to count as a drag instead of a click.
     */
    dragThreshold?: number;

    /**
     * Time to fade in tags at start, in milliseconds.
     */
    fadeIn?: number;

    /**
     * Set to true to pause movement when a tag is highlighted.
     */
    freezeActive?: boolean;

    /**
     * Set to true to decelerate when highlighted tags freeze instead of stopping suddenly.
     */
    freezeDecel?: boolean;

    /**
     * Set to true to prevent selection of tags at back of cloud.
     */
    frontSelect?: boolean;

    /**
     * Set to true to automatically hide the tag list element if TagCanvas is started successfully.
     */
    hideTags?: boolean;

    /**
     * Horizontal image alignment, one of “centre”, “left” or “right”.
     */
    imageAlign?: TagCanvasAlign;

    /**
     * What to display when tag contains images and text.
     * null
     *  Image if present, otherwise text.
     * image
     *  Image tags only.
     * text
     *  Text tags only.
     * both
     *  Image and text on tag using imagePosition.
     */
    imageMode?: null | 'image' | 'text' | 'both';

    /**
     * Distance between image and text when using an imageMode of “both”.
     */
    imagePadding?: number;

    /**
     * Position of image relative to text when using an imageMode of “both”. Options are “left”, “right”, “top“ or “bottom”.
     */
    imagePosition?: 'left' | 'right' | 'top' | 'bottom';

    /**
     * Radius for image corners, in pixels. Also supports using a percentage which must be enclosed in a string, e.g. "20%".
     */
    imageRadius?: number | string;

    /**
     * Amount to scale images by - the default of 1 uses the size they appear on the page. For no scaling (use the actual image size) set this to null.
     */
    imageScale?: number;

    /**
     * Vertical image alignment, one of “middle”, “top” or “bottom”.
     */
    imageVAlign?: TagCanvasVAlign;

    /**
     * Starting rotation speed, with horizontal and vertical values as an array, e.g. [0.8,-0.3]. Values are multiplied by maxSpeed.
     */
    initial?: number[];

    /**
     * Interval between animation frames, in milliseconds.
     */
    interval?: number;

    /**
     * Limits rotation of the cloud using the mouse. A value of "x" limits rotation to the x-axis, "y" limits rotation to the y-axis. A value of "xy" will prevent the cloud rotating in response to the mouse - the cloud will only move if the initial option is used to give it a starting speed.
     */
    lock?: string;

    /**
     * Brightness (opacity) of tags at front of cloud (0.0-1.0).
     */
    maxBrightness?: number;

    /**
     * Maximum speed of rotation.
     */
    maxSpeed?: number;

    /**
     * Brightness (opacity) of tags at back of cloud (0.0-1.0).
     */
    minBrightness?: number;

    /**
     * Minimum speed of rotation when mouse leaves canvas.
     */
    minSpeed?: number;

    /**
     * The minimum number of tags to show in the cloud. If the number of links available is lower than this value, the list will be repeated. The maximum supported value is 200. The repeatTags option takes precedence over minTags.
     */
    minTags?: number;

    /**
     * Set to true to prevent any mouse interaction. The initial option must be used to animate the cloud, otherwise it will be motionless.
     */
    noMouse?: boolean;

    /**
     * Set to true to prevent the selection of tags.
     */
    noSelect?: boolean;

    /**
     * Displays “No tags” instead of an empty canvas when there are no tags available.
     */
    noTagsMessage?: boolean;

    /**
     * Offsets the centre of the cloud horizontally (measured in pixels)
     */
    offsetX?: number;

    /**
     * Offsets the centre of the cloud vertically (measured in pixels)
     */
    offsetY?: number;

    /**
     * Colour of the active tag highlight. This can be a colour to use for all tags, or one of these options to set the colour differently for each tag:
     * tag
     *  Use the text colour from the original tag link
     * tagbg
     *  Use the background colour from the original tag link
     * See also the “outline” weightMode for another way to set the highlight colour.
     */
    outlineColour?: string;

    /**
     * Size of marching ants dash for outline/classic highlights, 0 for no dashes
     */
    outlineDash?: number;

    /**
     * Size of space between marching ants dashes, 0 for same as outlineDash
     */
    outlineDashSpace?: number;

    /**
     * Speed of marching ants animation, 0 for no movement, negative for reverse
     */
    outlineDashSpeed?: number;

    /**
     * Number of pixels to increase size of tag by for the “size” outline method. Negative values are supported for decreasing the size.
     */
    outlineIncrease?: number;

    /**
     * Type of highlight to use. Options are:
     * outline
     *  An outline at the same depth as the active tag.
     * classic
     *  Old-style outline on top of all tags.
     * block
     *  Solid block of colour around the active tag.
     * colour
     *  Changes the colour of the text or image of the current tag to the outlineColour value.
     * size
     *  Increases the size of the tag, using the outlineIncrease option for the amount.
     * none
     *  No highlighting at all.
     */
    outlineMethod?: 'outline' | 'classic' | 'block' | 'colour' | 'size' | 'none';

    /**
     * Distance of outline from text, in pixels. This also increases the size of the active area around the tag.
     */
    outlineOffset?: number;

    /**
     * Radius for rounded corners on outline box in pixels
     */
    outlineRadius?: number;

    /**
     * Thickness of outline in pixels
     */
    outlineThickness?: number;

    /**
     * Amount of space around text and inside background.
     */
    padding?: number;

    /**
     * Set to true to enable zooming in and out of the cloud by pinching on touchscreen devices.
     */
    pinchZoom?: boolean;

    /**
     * Pulse rate, in seconds per beat
     */
    pulsateTime?: number;

    /**
     * Pulsate outline to this opacity (0.0-1.0)
     */
    pulsateTo?: number;

    /**
     * Initial size of cloud from centre to sides.
     */
    radiusX?: number;

    /**
     * Initial size of cloud from centre to top and bottom.
     */
    radiusY?: number;

    /**
     * Initial size of cloud from centre to front and back.
     */
    radiusZ?: number;

    /**
     * The number of times to repeat the list of tags in the cloud. The maximum supported value is 64. This option overrides the minTags option.
     */
    repeatTags?: number;

    /**
     * Set to true to reverse direction of movement relative to mouse position.
     */
    reverse?: boolean;

    /**
     * Animation delay in milliseconds for when the page is being scrolled. Applies to all TagCanvas instances on the page.
     */
    scrollPause?: number;

    /**
     * Colour of the shadow behind each tag.
     */
    shadow?: string;

    /**
     * Amount of tag shadow blurring, in pixels.
     */
    shadowBlur?: number;

    /**
     * X and Y offset of the tag shadow, in pixels.
     * "[0,0]"
     */
    shadowOffset?: string;

    /**
     * The shape of the cloud. Currently supported are sphere, hcylinder for a cylinder that starts off horizontal, vcylinder for a cylinder that starts off vertical, hring for a horizontal circle and vring for a vertical circle. You may also provide the name of a function to use for generating the shape. See the TagCanvas shapes page for details and examples.
     */
    shape?: 'sphere' | 'hcylinder' | 'vcylinder' | 'hring' | 'vring' | string;

    /**
     * Set to true to randomize the order of the tags.
     */
    shuffleTags?: boolean;

    /**
     * If greater than 0, breaks the tag into multiple lines at word boundaries when the line would be longer than this value. Lines are automatically broken at <br> tags.
     */
    splitWidth?: number;

    /**
     * Stretch or compress the cloud horizontally.
     */
    stretchX?: number;

    /**
     * Stretch or compress the cloud vertically.
     */
    stretchY?: number;

    /**
     * Horizontal text alignment, one of “centre”, “left” or “right”.
     */
    textAlign?: TagCanvasAlign;

    /**
     * Colour of the tag text - empty string or null to use the colour of the original link.
     */
    textColour?: string;

    /**
     * Font family for the tag text - empty string or null to use the font of the original link.
     */
    textFont?: string;

    /**
     * Height of the tag text font (in pixels).
     */
    textHeight?: number;

    /**
     * Vertical text alignment, one of “middle”, “top” or “bottom”.
     */
    textVAlign?: TagCanvasVAlign;

    /**
     * Sets tooltip display method: null for no tooltips; native for operating system tooltips; div for div-based.
     */
    tooltip?: 'native' | 'div';

    /**
     * Class of tooltip div.
     */
    tooltipClass?: string;

    /**
     * Time to pause while mouse is not moving before displaying tooltip div, in milliseconds.
     */
    tooltipDelay?: number;


    /**
     * Text optimisation, converts text tags to images for better performance.
     */
    txtOpt?: boolean;

    /**
     * Scaling factor of text when converting to image in txtOpt mode.
     */
    txtScale?: number;

    /**
     * Set to true to turn on weighting of tags.
     */
    weight?: boolean;

    /**
     * The link attribute to take the tag weight from. The default of null means that the weight is taken from the calculated link font size.
     */
    weightFrom?: any;


    /**
     * The colour gradient used for colouring tags, backgrounds, etc. when using a colour-based weight mode.
     * default:"{0:'#f00', 0.33:'#ff0', 0.66:'#0f0', 1:'#00f'}"
     */
    weightGradient?: any;

    /**
     * Method to use for displaying tag weights. Should be one of:
     * size
     *  Display more significant tags in a larger font size.
     * colour
     * Display tags using colour values from the weightGradient option.
     * both
     * Use both size and colour to visualise weights.
     * bgcolour
     *  Use a weightGradient to set the tag background colour.
     * bgoutline
     *  Use a weightGradient to set the tag background outline colour. Tag background outlines must be enabled using the bgOutlineThickness option.
     * outline
     *  Use a weightGradient to set the tag highlight colour.
     */
    weightMode?: 'size' | 'colour' | 'both' | 'bgcolour' | 'bgoutline' | 'outline';

    /**
     * Multiplier for adjusting the size of tags when using a weight mode of size or both.
     */
    weightSize?: number;

    /**
     * Maximum font size when weighted sizing is enabled.
     */
    weightSizeMax?: number;

    /**
     * Minimum font size when weighted sizing is enabled.
     */
    weightSizeMin?: number;

    /**
     * Enables zooming the cloud in and out using the mouse wheel or scroll gesture.
     */
    wheelZoom?: boolean;

    /**
     * Enables zooming the cloud in and out using the mouse wheel or scroll gesture.
     */
    zoom?: number;

    /**
     * Maximum zoom value.
     */
    zoomMax?: number;

    /**
     * Minimum zoom value.
     */
    zoomMin?: number;

    /**
     * The amount that the zoom is changed by with each movement of the mouse wheel..
     */
    zoomStep?: number;
}

